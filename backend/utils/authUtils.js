import koneksiDB from "../connection/db.js";
import jwt from "jsonwebtoken";

//function API CALLBACK facebook to login with facebook
export const handleFacebookCallback = (req, res) => {
  //create token jwt payload to save cookies browser
  const token = jwt.sign({ userId: req.user.id, username: req.user.username }, "rahasia", {
    expiresIn: "1d",
  });
  console.log(`tokenFB: ${token}`);

  //and then save token in database
  koneksiDB.query("CALL update_token(?, ?)", [token, req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error saat menyimpan token ke database",
      });
    }

    /*
     * Token success to save in database
     * Set cookie to redirect user client
    */
    res.cookie("token", token, {
      secure: false,
      httpOnly: false,
      expiresIn: "1d",
    });
    res.redirect("http://localhost:5173/home");
  });
};

//function API CALLBACK google to login with google
export const handleGoogleCallback = (req, res) => {

  //create token jwt payload to save cookies browser
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

  //and then save token in database
  koneksiDB.query("CALL update_token(?, ?)", [token, req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error saat menyimpan token ke database",
      });
    }

    /*
     * Token success to save in database
     * Set cookie to redirect user client
    */
    res.cookie("token", token, {
      secure: false,
      httpOnly: false,
      expiresIn: "1d",
    });
    res.redirect("http://localhost:5173/home");
  });
};
