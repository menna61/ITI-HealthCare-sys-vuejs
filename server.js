import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { sendCancellationEmail } from "./mail.js";
import { sendDoctorRemovalEmail } from "./mail.js";
import { sendDeletionEmail } from "./mail.js";
import { sendDoctorDeletionCancellationEmail } from "./mail.js";
import { sendApprovalEmail } from "./mail.js";

dotenv.config();

// ✅ Initialize Firebase Admin
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;

if (!process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
  console.error("❌ Missing Firebase Admin credentials in .env file");
  console.error("Please add FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY to .env");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "health-care-456db",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
});
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create checkout session endpoint
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount } = req.body; // amount in cents (e.g., 1000 = $10)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Test Product" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url:
        "https://fastidious-jelly-b1b358.netlify.app/#/patient/appointments?payment=success",
      cancel_url: "https://fastidious-jelly-b1b358.netlify.app/#/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Send cancellation email
app.post("/send-cancellation-email", async (req, res) => {
  try {
    const { patientId, patientName, doctorName, date, time } = req.body || {};
    if (!patientId) {
      return res.status(400).json({ error: "'patientId' is required" });
    }
    await sendCancellationEmail({ patientId, patientName, doctorName, date, time });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to send email" });
  }
});

app.post("/api/send-deletion-email", async (req, res) => {
  console.log("Received deletion email request:", req.body);
  try {
    const { patientId, patientName, reason } = req.body;

    if (!patientId || !patientName || !reason) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ error: "Missing required fields: patientId, patientName, reason" });
    }

    console.log("Sending deletion email for patient:", patientId);
    await sendDeletionEmail({ patientId, patientName, reason });

    console.log("Deletion email sent successfully");
    res.status(200).json({ message: "Deletion email sent successfully" });
  } catch (error) {
    console.error("Error sending deletion email:", error);
    res.status(500).json({ error: "Failed to send deletion email" });
  }
});

// ✅ Send doctor removal email
app.post("/send-doctor-removal-email", async (req, res) => {
  try {
    const { patientId, patientName, doctorName } = req.body || {};
    if (!patientId || !doctorName) {
      return res.status(400).json({ error: "'patientId' and 'doctorName' are required" });
    }
    await sendDoctorRemovalEmail({ patientId, patientName, doctorName });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to send email" });
  }
});

// ✅ Send doctor deletion cancellation email
app.post("/send-doctor-deletion-cancellation-email", async (req, res) => {
  try {
    const { patientId, patientName, doctorName, date, time, refundAmount } = req.body || {};
    if (!patientId || !doctorName) {
      return res.status(400).json({ error: "'patientId' and 'doctorName' are required" });
    }
    await sendDoctorDeletionCancellationEmail({
      patientId,
      patientName,
      doctorName,
      date,
      time,
      refundAmount,
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to send email" });
  }
});

// ✅ Send approval email
app.post("/send-approval-email", async (req, res) => {
  console.log("📧 Received approval email request:", req.body);
  try {
    const { userId, email, firstName, lastName } = req.body || {};
    if (!userId || !email || !firstName || !lastName) {
      console.error("❌ Error: Missing required fields");
      return res.status(400).json({ error: "userId, email, firstName, and lastName are required" });
    }
    console.log("📤 Sending approval email to:", email);
    await sendApprovalEmail({ email, firstName, lastName });
    console.log("✅ Approval email sent successfully to:", email);
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Error sending approval email:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: err.message || "Failed to send email" });
  }
});

// ✅ Delete user from Firebase Authentication
app.post("/delete-auth-user", async (req, res) => {
  console.log("🗑️ Received delete auth user request:", req.body);
  try {
    const { uid } = req.body;

    if (!uid) {
      console.error("❌ Error: Missing uid");
      return res.status(400).json({ error: "uid is required" });
    }

    console.log("🗑️ Deleting user from Firebase Auth:", uid);
    await admin.auth().deleteUser(uid);
    console.log("✅ User deleted successfully from Firebase Auth:", uid);

    res.status(200).json({ message: "User deleted successfully from Authentication" });
  } catch (error) {
    console.error("❌ Error deleting auth user:", error);
    res.status(500).json({ error: error.message || "Failed to delete user from Authentication" });
  }
});

// ✅ Start server
app.listen(4242, () => console.log("✅ Server running at http://localhost:4242"));

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
