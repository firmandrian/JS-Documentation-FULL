import koneksiDB from "../src/config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const resetPassword = (req, res) => {
    const id = req.params.id
    const token = req.params.token
    const newPassword = req.body.newPassword
    const saltRounds = 10
  
    jwt.verify(token, "secret", (error, decodedToken) => {
      console.log(decodedToken);
      if (error) {
        return res.json({message: "Authenticate Error"})
      } else {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) {
              return res.status(500).json({message: "Internal server error"})
            }
  
            //ubah password user yang lama menjadi password yang baru
            koneksiDB.query(
              'CALL sp_updatePassword(?, ?)',
              [id, hash],
              (err, result) => {
                console.log(result, 'hasil perubahan');
                if (err) {
                  return res.status(500).json({ message: "Internal Server error" });
                }
                if (result.affectedRows === 0) {
                  return res.status(400).json({ message: "User Not Found!" });
                }
                return res.json({ message: "Password reset success!" });
              }
            );          
          })
        })
      }
    })
  }