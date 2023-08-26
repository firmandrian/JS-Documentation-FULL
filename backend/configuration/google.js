import passport from "passport";
import koneksiDB from "../connection/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config();

const saltRounds = 10;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: "http://localhost:4100/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      try {
        const nama = profile.displayName;
        const username = profile.displayName;
        const email = profile.emails[0].value;
        const password = profile.displayName;
        const type = "google";

        koneksiDB.query("CALL sp_Oauth(?)", [username], (err, rows) => {
          if (err) {
            return done(err);
          }

          if (rows.length > 0) {
            // lakukan validasi jika username sudah ada
            const user = rows[0][0];
            return done(null, user);
          } else {
            //jika tidak maka simpan ke DB
            bcrypt.hash(password, saltRounds, (err, hash) => {
              if (err) {
                return done(err);
              }

              koneksiDB.query(
                "CALL sp_insertUser(?, ?, ?, ?, ?)",
                [nama, username, email, hash, type],
                (err, result) => {
                  if (err) {
                    return done(err);
                  }

                  const user = {
                    id: result.insertId,
                    nama: nama,
                    username: username,
                    email: email,
                    type: type,
                  };

                  return done(null, user);
                }
              );
            });
          }
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default passport;
