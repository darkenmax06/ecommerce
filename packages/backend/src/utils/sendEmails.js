import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID = process.env.OAUTH2_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.OAUTH2_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail({to="davidcctv2024@gmail.com",subject, content,replyTo="therealfatdv@gmail.com"}) {
  try {
    const { token } = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "therealfatdv@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: token,
      },
    });

    const mailOptions = {
      from: "THE REAL FAT DV 🔥<therealfatdv@gmail.com>",
      to,
      replyTo,
      subject,
      html: content,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;

  } catch (error) {
    console.log("Error enviando correo:", error);
  }
}
