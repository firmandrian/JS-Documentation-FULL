import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import facebookPassport from "../passports/facebook.js";
import googlePassport from "../passports/google.js";
import { login } from "../controllers/loginUserController.js";
import { register } from "../controllers/registrationUsers.js";
import { forgotPassword } from "../controllers/forgotPasswordController.js";
import { resetPassword } from "../controllers/resetPasswordController.js";
import { getData, home, search, pagination } from "../controllers/getDataRoutes.js";
import { postData, logout } from "../controllers/postDataRoutes.js";
import { editData } from "../controllers/updateDataRoutes.js";
import { deleteData } from "../controllers/deleteDataRoutes.js";
import {
  handleFacebookCallback,
  handleGoogleCallback,
} from "../utils/authUtils.js";
const router = express.Router();

router.get("/", getData);
router.post("/addData", postData);
router.delete("/deleteData/:id", deleteData);
router.put("/editContact/:id", editData);
router.post("/register", register);
router.get("/home", authenticateToken, home);
router.post("/login", login);
router.get("/search", authenticateToken, search);
router.get("/data", authenticateToken, pagination);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:id/:token", resetPassword)

//routes facebook
router.get("/auth/facebook", facebookPassport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  facebookPassport.authenticate("facebook"),
  handleFacebookCallback
);

//routes google
router.get(
  "/auth/google",
  googlePassport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  googlePassport.authenticate("google", { session: false }),
  handleGoogleCallback
);

export default router;
