import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Stripe secret key (test mode)
const stripe = new Stripe("sk_test_51SMGyS5xDzYJEhy7m2UdB1dmwV3tLY3Ysv6qM2W2rzcOinc0dEgbFdDiphCVvChPYIXkHpF0YDSzgDbK41svXulX00Kxp8mByo");

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

// ✅ Start server
app.listen(4242, () => console.log("✅ Server running at http://localhost:4242"));
