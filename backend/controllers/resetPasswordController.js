import koneksiDB from "../connection/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//function for resetPassword Account
export const resetPassword = (req, res) => {
  // const id = req.params.id;
  const token = req.params.token;
  const newPassword = req.body.newPassword;
  const saltRounds = 10;

  //verify token user
  jwt.verify(token, "secret", (error, decodedToken) => {
    console.log(decodedToken);
    if (error) {
      return res.json({ message: "Authenticate Error" });
    } else {
      const userId = decodedToken.id;
      //bcrypt the new password account user
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }

          /*
           * change old password user to the new password,
           * and save the new password user into database
           */
          koneksiDB.query(
            "CALL sp_updatePassword(?, ?)",
            [userId, hash],
            (err, result) => {
              console.log(result, "hasil perubahan");
              if (err) {
                return res
                  .status(500)
                  .json({ message: "Internal Server error" });
              }
              if (result.affectedRows === 0) {
                return res.status(400).json({ message: "User Not Found!" });
              }
              return res.json({ message: "Password reset success!" });
            }
          );
        });
      });
    }
  });
};
