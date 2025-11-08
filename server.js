import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import { sendCancellationEmail } from "./mail.js";
import { sendDoctorRemovalEmail } from "./mail.js";
import { sendDeletionEmail } from "./mail.js";
import { sendDoctorDeletionCancellationEmail } from "./mail.js";

dotenv.config();
const app = express();
// const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// ✅ Stripe secret key (test mode)
const stripe = new Stripe(
  "sk_test_51SMGyS5xDzYJEhy7m2UdB1dmwV3tLY3Ysv6qM2W2rzcOinc0dEgbFdDiphCVvChPYIXkHpF0YDSzgDbK41svXulX00Kxp8mByo"
);

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
      success_url: "http://localhost:5173/#/patient/appointments",
      cancel_url: "http://localhost:5173/cancel",
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

// ✅ Start server
app.listen(4242, () => console.log("✅ Server running at http://localhost:4242"));

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
