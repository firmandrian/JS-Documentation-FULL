import koneksiDB from "../src/config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * * Login user :
 * @module Login
 * @alias module:Login
 * @author Firman Andrian
 * @copyright 2023
 * @type {object}
 * @property {string} usernameOrEmail - usernameOrEmail
 * @property {string} password - password
 */

//fungsi login
export const login = (req, res) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  const password = req.body.password;
  console.log(req.body);

  //lakukan validasi apakah email atau username ada di DB atau tidak
  koneksiDB.query("CALL sp_getUser(?)", [usernameOrEmail], (err, result) => {
    console.log(result);
    // const type = result[0].type;
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Error login" });
    }
    // if (type === "facebook") {
    //   return res.status(400).json({ status: false, message: "Registrasi terlebih dahulu" });
    // }
    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Email atau Username tidak ditemukan.",
      });
    }

    const user = JSON.parse(JSON.stringify(result[0][0]));
    console.log(user);
    const hashedPassword = user.password;
    /*
        jika email atau username ada di database,
        maka bandingkan password yang user input dengan di DB
        */
    bcrypt.compare(password, hashedPassword, (err, match) => {
      // console.log(match);
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Error login" });
      }
      /*
          jika berhasil masuk, maka ambil parameter match yang bernilai true
          dan buatkan token JWT
          */
      if (match) {
        // Membuat token JWT
        const token = jwt.sign(
          { userId: user.id, username: user.username, email: user.email },
          "rahasia",
          {
            expiresIn: "1d",
          }
        );
        console.log(`ini adalah token ${token}`);

        //simpan token di DB
        koneksiDB.query(
          "CALL updateTokenProcedure(?, ?)",
          [token, user.id],
          (err) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ success: false, message: "Error login" });
            }
            //simpan token JWT di cookies browser
            res.cookie("token", token, {
              httpOnly: false,
              expiresIn: "1d",
            });

            return res
              .status(200)
              .json({ success: true, message: "Login berhasil.", token });
          }
        );
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Password tidak valid." });
      }
    });
  });
};
