import jwt from "jsonwebtoken";
import koneksiDB from "../connection/db.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //check token users exist, or not
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token tidak tersedia" });
  }

  /*
   * if token invalid or expired,
   * then jwt will run this program
   */
  jwt.verify(token, "rahasia", (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Token tidak valid" });
    }

    const userId = user.userId;
    // console.log(userId);
    // verification token in database
    koneksiDB.query("CALL verify_token(?)", [userId], (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "Error database" });
      }

      /*
       * verification token, if token not same between the database and the client
      */
      if (result.length === 0 || result[0][0].token !== token) {
        return res
          .status(401)
          .json({ success: false, message: "Token tidak valid" });
      }

      // token valid, next to the handler
      req.user = user;
      next();
    });
  });
}
