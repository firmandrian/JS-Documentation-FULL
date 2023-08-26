import koneksiDB from "../connection/db.js";
import bcrypt from "bcrypt";

/**
 * Registrasi akun
 * @module Registration
 * @alias module:Registration
 * @author Firman Andrian
 * @copyright 2023
 * @type {object}
 * @property {string} nama - name
 * @property {string} username - username
 * @property {string} email - email
 * @property {string} password  -password
 */

//fungsi saltround digunakan untuk mengatur kompleksitas dan kekuatan enkripsi hash yang dilakukan,
//semakin banyak value nya semakin banyak proses enkripsi nya

//function registration account user
export const register = (req, res) => {
  const saltRounds = 10;
  const nama = req.body.nama;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  //validation user input
  if (nama.length < 5) {
    return res.status(400).send("Please enter a name of at least 5 characters");
  }
  if (username.length < 7) {
    return res.status(400).send("Please enter a name of at least 7 characters");
  }
  if (password.length < 8) {
    return res.status(400).send("Minimum 8 character password");
  }

  //bcrypt password account user
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error registering user");
      } else {
        // save account data user into database
        koneksiDB.query(
          "CALL RegisterUser(?, ?, ?, ?, @registrationStatus)",
          [nama, username, email, hash],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error registering user");
            } else {
              koneksiDB.query(
                "SELECT @registrationStatus AS registrationStatus",
                (err, rows) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send("Error registering user");
                  } else {
                    const registrationStatus = rows[0].registrationStatus;
                    if (registrationStatus === "user register success") {
                      res.status(200).send(registrationStatus);
                    } else {
                      res.status(400).send(registrationStatus);
                    }
                  }
                }
              );
            }
          }
        );
      }
    });
  });
};
