import koneksiDB from "../src/config/db.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {google} from "googleapis"

dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.CLIENT_REFRESH_TOKEN;

// Buat OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

export const forgotPassword = async (req, res) => {
  const usernameOrEmail = req.body.usernameOrEmail;
  koneksiDB.query(
    "CALL sp_getUser(?)", [usernameOrEmail], async (error, results) => {
      console.log(results);
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.send({ status: 'User not found!' });
      }

      const user = results[0][0];
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

      try {
        // Ambil akses token dari OAuth2 Client
        const accessToken = await oAuth2Client.getAccessToken();

        // Konfigurasi transporter dengan akses token
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

        // Kirim email
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: 'firmanandrian100@gmail.com',
          subject: 'Reset Your Password!',
          text: `http://localhost:5173/reset-password/${user.id}/${token}`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);

        return res.json({ message: 'Email Has send success!' });
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: 'Failed to send email' });
      }
    }
  );
};