import koneksiDB from "../src/config/db.js";
import jwt from "jsonwebtoken";

export const handleFacebookCallback = (req, res) => {
  const token = jwt.sign({ userId: req.user.id, username: req.user.username }, "rahasia", {
    expiresIn: "1d",
  });
  console.log(`tokenFB: ${token}`);

  koneksiDB.query("CALL update_token(?, ?)", [token, req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error saat menyimpan token ke database",
      });
    }

    // Token berhasil disimpan ke database
    // Set cookie atau redirect pengguna
    res.cookie("token", token, {
      secure: false,
      httpOnly: false,
      expiresIn: "1d",
    });
    res.redirect("http://localhost:5173/home");
  });
};

export const handleGoogleCallback = (req, res) => {
  const token = jwt.sign(
    {
      userId: req.user.id,
      nama: req.user.nama,
      username: req.user.username,
      email: req.user.email,
    },
    "rahasia",
    {
      expiresIn: "1d",
    }
  );
  console.log(`tokenGoogle: ${token}`);

  koneksiDB.query("CALL update_token(?, ?)", [token, req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error saat menyimpan token ke database",
      });
    }

    // Token berhasil disimpan ke database
    // Set cookie atau redirect pengguna
    res.cookie("token", token, {
      secure: false,
      httpOnly: false,
      expiresIn: "1d",
      // domain: "localhost",
      // sameSite: "none",
    });
    res.redirect("http://localhost:5173/home");
  });
};
