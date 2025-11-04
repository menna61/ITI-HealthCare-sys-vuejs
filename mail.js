/* eslint-disable no-undef */
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./src/firebase.js";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendCancellationEmail({ patientId, patientName, doctorName, date, time }) {
  // Fetch patient email from Firestore
  const patientRef = doc(db, "patients", patientId);
  const patientSnap = await getDoc(patientRef);
  if (!patientSnap.exists()) {
    throw new Error("Patient not found");
  }
  const patientData = patientSnap.data();
  const to = patientData.email;
  if (!to) {
    throw new Error("Patient email not found");
  }
  const subject = "Appointment Cancelled by Doctor";
  const text = `Hello ${patientName || "Patient"},\n\nWe’re sorry to inform you that Dr. ${
    doctorName || "your doctor"
  } has cancelled your session scheduled on ${date || "[date]"} at ${
    time || "[time]"
  }.\n\nPlease open the app to rebook or contact support if you need help.\n\nBest regards,\nHealthcare Team`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
  <h2 style="margin:0 0 12px">Appointment Cancelled</h2>
  <p>Hello ${patientName || "Patient"},</p>
  <p>We’re sorry to inform you that <strong>Dr. ${
    doctorName || "your doctor"
  }</strong> has cancelled your session scheduled on <strong>${
    date || "[date]"
  }</strong> at <strong>${time || "[time]"}</strong>.</p>
  <p>Please open the app to rebook or contact support if you need help.</p>
  <p style="margin-top:24px">Best regards,<br/>Healthcare Team</p>
</div>`;

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken?.token || accessToken,
      },
    });

    const mailOptions = {
      from: `Healthcare <${EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Failed to send cancellation email: ${error.message}`);
  }
}
