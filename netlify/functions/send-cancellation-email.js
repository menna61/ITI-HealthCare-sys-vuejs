import admin from "firebase-admin";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// ✅ Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  if (!process.env.FIREBASE_CLIENT_EMAIL || !privateKey || !process.env.FIREBASE_PROJECT_ID) {
    console.error("❌ Missing Firebase Admin credentials in environment variables");
    throw new Error("Missing Firebase Admin credentials");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

const db = admin.firestore();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { patientId, patientName, doctorName, date, time } = JSON.parse(event.body);

    if (!patientId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "patientId is required" }),
      };
    }

    // Fetch patient email from Firestore
    const patientDoc = await db.collection("patients").doc(patientId).get();

    if (!patientDoc.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Patient not found" }),
      };
    }

    const patientData = patientDoc.data();
    const to = patientData.email;

    if (!to) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Patient email not found" }),
      };
    }

    const subject = "Appointment Cancelled by Doctor";
    const text = `Hello ${patientName || "Patient"},\n\nWe're sorry to inform you that Dr. ${
      doctorName || "your doctor"
    } has cancelled your session scheduled on ${date || "[date]"} at ${
      time || "[time]"
    }.\n\nPlease open the app to rebook or contact support if you need help.\n\nBest regards,\nHealthcare Team`;

    const html = `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
    <h2 style="margin:0 0 12px">Appointment Cancelled</h2>
    <p>Hello ${patientName || "Patient"},</p>
    <p>We're sorry to inform you that <strong>Dr. ${
      doctorName || "your doctor"
    }</strong> has cancelled your session scheduled on <strong>${
      date || "[date]"
    }</strong> at <strong>${time || "[time]"}</strong>.</p>
    <p>Please open the app to rebook or contact support if you need help.</p>
    <p style="margin-top:24px">Best regards,<br/>Healthcare Team</p>
  </div>`;

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransporter({
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

    await transport.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("❌ Error sending cancellation email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Failed to send email" }),
    };
  }
};
