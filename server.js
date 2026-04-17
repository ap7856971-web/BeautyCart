const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const razorpay = new Razorpay({
  key_id: "rzp_test_xxxxxx",        // 🔑 YOUR KEY ID
  key_secret: "YOUR_SECRET_KEY"     // 🔐 YOUR SECRET
});

/* CREATE ORDER */
app.post("/create-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: 50000, // ₹500
      currency: "INR",
      receipt: "receipt_001"
    });
    res.json(order);
  } catch (e) {
    res.status(500).send(e);
  }
});

/* VERIFY PAYMENT */
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "YOUR_SECRET_KEY")
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ status: "success" });
  } else {
    res.json({ status: "failed" });
  }
});

app.listen(5000, () =>
  console.log("✅ Server running: http://localhost:5000")
);
// WEBHOOK ENDPOINT
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const secret = "webhook_secret_123";

  const crypto = require("crypto");
  const signature = req.headers["x-razorpay-signature"];

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(req.body)
    .digest("hex");

  if (expectedSignature === signature) {
    const event = JSON.parse(req.body);

    if (event.event === "payment.captured") {
      console.log("✅ Payment Captured:", event.payload.payment.entity.id);
    }

    if (event.event === "payment.failed") {
      console.log("❌ Payment Failed");
    }

    res.json({ status: "ok" });
  } else {
    res.status(400).send("Invalid signature");
  }
});
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "razorpay_db"
});

db.connect();
