import passport from "passport";
import koneksiDB from "../connection/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Strategy as FacebookStrategy } from "passport-facebook";

dotenv.config();

const saltRounds = 10;
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_ID_FACEBOOK,
      clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
      callbackURL: "http://localhost:4100/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      try {
        // Mendapatkan informasi profil dari Facebook
        const nama = profile.displayName;
        const username = profile.displayName;
        const password = profile.displayName;
        const type = "facebook";

        koneksiDB.query("CALL sp_Oauth(?)", [username], (err, rows) => {
          console.log(rows);
          if (err) {
            return done(err);
          }
          if (rows.length > 0) {
            const user = rows[0][0];
            return done(null, user);
          } else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
              if (err) {
                return done(err);
              }
              koneksiDB.query(
                "CALL sp_insertUser(?, ?, ?, ?, ?)",
                [nama, username, hash, type],
                (err, result) => {
                  if (err) {
                    return done(err);
                  }

                  const user = {
                    id: result.insertId,
                    nama,
                    username,
                    type,
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
