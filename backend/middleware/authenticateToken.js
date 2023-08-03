import jwt from "jsonwebtoken";
import koneksiDB from "../src/config/db.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token tidak tersedia" });
  }

  jwt.verify(token, "rahasia", (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token tidak valid" });
    }

    const userId = user.userId;
    // console.log(userId);
    // Verifikasi token di database
    koneksiDB.query("CALL verify_token(?)", [userId], (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "Error database" });
      }

      if (result.length === 0 || result[0][0].token !== token) {
        return res
          .status(401)
          .json({ success: false, message: "Token tidak valid" });
      }

      // Token valid, lanjutkan ke handler berikutnya
      req.user = user;
      next();
    });
  });
}
