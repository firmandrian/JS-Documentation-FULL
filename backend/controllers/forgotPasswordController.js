import koneksiDB from "../connection/db.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { google } from "googleapis";
import { createHash } from "crypto";

dotenv.config();

const clientId     = process.env.CLIENT_ID;               // client id from google API
const clientSecret = process.env.CLIENT_SECRET;           // client secret from google API
const refreshToken = process.env.CLIENT_REFRESH_TOKEN;    // refresh token from google OAuth 2.0 Playground

// create OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

//create function forgotPassword
export const forgotPassword = async (req, res) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  // call the database
  koneksiDB.query(
    "CALL sp_getUser(?)",
    [usernameOrEmail],
    async (error, results) => {
      console.log(results);

      //error response
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.length === 0) {
        return res.send({ status: "User not found!" });
      }

      //success response
      const user = results[0][0];
      //create token JWT
      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });

      try {
        // convert user.id from database into a string
        const userId = user.id.toString();
        // create hash with algorithm SHA-256
        const hash = createHash("sha256");
        // update user.id with hash variable, which is algorithm SHA-256
        hash.update(userId);
        // convert hash string to base64 format
        const hashedUserId = hash.digest("base64");
        // take access token from OAuth2 Client
        const accessToken = await oAuth2Client.getAccessToken();

        console.log(hashedUserId);
        // configuration transporter with access token
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.GMAIL_USER,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken,
          },
        });

        // send email to recipient
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: "firmanandrian100@gmail.com",
          subject: "Reset Your Password!",
          text: `http://localhost:5173/reset-password/${hashedUserId}/${token}`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);

        // email success to send
        return res.json({ message: "Email Has send success!" });
      } catch (error) {
        // error send email to recipient
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }
    }
  );
};
