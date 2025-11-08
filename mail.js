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

  try {
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

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Failed to send cancellation email: ${error.message}`);
  }
}

export async function sendRejectionEmail({ userId, userType, rejectionReason }) {
  let userRef, userSnap, userData, to, userName, subject, text, html;

  try {
    if (userType === "doctor") {
      userRef = doc(db, "doctors", userId);
      userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        throw new Error("Doctor not found");
      }
      userData = userSnap.data();
      to = userData.email;
      userName = `Dr. ${userData.firstName} ${userData.lastName}`;
      subject = "Document Rejection Notification";
      text = `Hello ${userName},\n\nWe regret to inform you that your submitted documents have been rejected for the following reason:\n\n${rejectionReason}\n\nPlease review the feedback and re-upload your documents with the necessary corrections.\n\nBest regards,\nHealthcare Team`;
      html = `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
  <h2 style="margin:0 0 12px">Document Rejection</h2>
  <p>Hello ${userName},</p>
  <p>We regret to inform you that your submitted documents have been rejected for the following reason:</p>
  <p style="background:#f8f9fa;padding:12px;border-left:4px solid #dc3545;margin:12px 0;"><strong>${rejectionReason}</strong></p>
  <p>Please review the feedback and re-upload your documents with the necessary corrections.</p>
  <p style="margin-top:24px">Best regards,<br/>Healthcare Team</p>
</div>`;
    } else if (userType === "patient") {
      userRef = doc(db, "patients", userId);
      userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        throw new Error("Patient not found");
      }
      userData = userSnap.data();
      to = userData.email;
      userName = `${userData.firstName} ${userData.lastName}`;
      subject = "Union Card Rejection Notification";
      text = `Hello ${userName},\n\nWe regret to inform you that your submitted union card has been rejected for the following reason:\n\n${rejectionReason}\n\nPlease review the feedback and re-upload your union card with the necessary corrections.\n\nBest regards,\nHealthcare Team`;
      html = `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
  <h2 style="margin:0 0 12px">Union Card Rejection</h2>
  <p>Hello ${userName},</p>
  <p>We regret to inform you that your submitted union card has been rejected for the following reason:</p>
  <p style="background:#f8f9fa;padding:12px;border-left:4px solid #dc3545;margin:12px 0;"><strong>${rejectionReason}</strong></p>
  <p>Please review the feedback and re-upload your union card with the necessary corrections.</p>
  <p style="margin-top:24px">Best regards,<br/>Healthcare Team</p>
</div>`;
    } else {
      throw new Error("Invalid user type");
    }

    if (!to) {
      throw new Error("User email not found");
    }

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

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Failed to send rejection email: ${error.message}`);
  }
}

export async function sendApprovalEmail({ email, firstName, lastName }) {
  try {
    const to = email;
    const userName = `Dr. ${firstName} ${lastName}`;
    const subject = "Document Approval Notification";
    const text = `Hello ${userName},\n\nCongratulations! We are pleased to inform you that your submitted documents have been approved.\n\nYou can now log in to your account and start using our platform.\n\nBest regards,\nHealthcare Team`;
    const html = `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
<h2 style="margin:0 0 12px">Documents Approved</h2>
<p>Hello ${userName},</p>
<p>Congratulations! We are pleased to inform you that your submitted documents have been approved.</p>
<p>You can now log in to your account and start using our platform.</p>
<p style="margin-top:24px">Best regards,<br/>Healthcare Team</p>
</div>`;

    if (!to) {
      throw new Error("User email not found");
    }

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

    const mailOptions = { from: `Healthcare <${EMAIL_USER}>`, to, subject, text, html };
    return await transport.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Failed to send approval email: ${error.message}`);
  }
}

export async function sendDoctorRemovalEmail({ patientId, patientName, doctorName }) {
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
  const subject = "Doctor Removal Notification";
  const text = `Hello ${patientName || "Patient"},\n\nWe regret to inform you that Dr. ${
    doctorName || "your doctor"
  } has been removed from our platform.\n\nAny upcoming appointments with this doctor have been cancelled. Please log in to your account to reschedule with another doctor.\n\nWe apologize for any inconvenience caused.\n\nBest regards,\nHealthcare Team`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
  <h2 style="margin:0 0 12px">Doctor Removal Notification</h2>
  <p>Hello ${patientName || "Patient"},</p>
  <p>We regret to inform you that <strong>Dr. ${
    doctorName || "your doctor"
  }</strong> has been removed from our platform.</p>
  <p>Any upcoming appointments with this doctor have been cancelled. Please log in to your account to reschedule with another doctor.</p>
  <p>We apologize for any inconvenience caused.</p>
  <p style="margin-top:24px">Best regards,<br/>Healthcare Team</p>
</div>`;

  try {
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

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Failed to send doctor removal email: ${error.message}`);
  }
}

export async function sendDoctorDeletionCancellationEmail({
  patientId,
  patientName,
  doctorName,
  date,
  time,
  refundAmount,
}) {
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
  const subject = "Appointment Cancelled - Doctor Removed";
  const text = `Hello ${patientName || "Patient"},\n\nWe regret to inform you that Dr. ${
    doctorName || "your doctor"
  } has been removed from our platform, and your appointment scheduled on ${date || "[date]"} at ${
    time || "[time]"
  } has been cancelled.\n\nThe amount of $${
    refundAmount || "[amount]"
  } has been refunded to your wallet.\n\nPlease log in to your account to reschedule with another doctor.\n\nWe apologize for any inconvenience caused.\n\nBest regards,\nHealthcare Team`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
  <h2 style="margin:0 0 12px">Appointment Cancelled</h2>
  <p>Hello ${patientName || "Patient"},</p>
  <p>We regret to inform you that <strong>Dr. ${
    doctorName || "your doctor"
  }</strong> has been removed from our platform, and your appointment scheduled on <strong>${
    date || "[date]"
  }</strong> at <strong>${time || "[time]"}</strong> has been cancelled.</p>
  <p>The amount of <strong>$${
    refundAmount || "[amount]"
  }</strong> has been refunded to your wallet.</p>
  <p>Please log in to your account to reschedule with another doctor.</p>
  <p>We apologize for any inconvenience caused.</p>
  <p style="margin-top:24px">Best regards,<br/>Healthcare Team</p>
</div>`;

  try {
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

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Failed to send doctor deletion cancellation email: ${error.message}`);
  }
}

export async function sendDeletionEmail({ patientId, patientName, reason }) {
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
  const subject = "Account Deletion Notification";
  const text = `Hello ${
    patientName || "Patient"
  },\n\nWe regret to inform you that your account has been deleted for the following reason:\n\n${reason}\n\nIf you believe this was a mistake, please contact support.\n\nBest regards,\nHealthcare Team`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
  <h2 style="margin:0 0 12px">Account Deletion Notification</h2>
  <p>Hello ${patientName || "Patient"},</p>
  <p>We regret to inform you that your account has been deleted for the following reason:</p>
  <p style="background:#f8f9fa;padding:12px;border-left:4px solid #dc3545;margin:12px 0;"><strong>${reason}</strong></p>
  <p>If you believe this was a mistake, please contact support.</p>
  <p style="margin-top:24px">Best regards,<br/>Healthcare Team</p>
</div>`;

  try {
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

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error(`Failed to send deletion email: ${error.message}`);
  }
}
