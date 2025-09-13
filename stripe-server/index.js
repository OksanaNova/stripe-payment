import express from 'express';
import 'dotenv/config';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post("/stripe/charge", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", 
      },
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      clientSecret: payment.client_secret,
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error.message);
    res.json({
      message: error.message,
      success: false,
    });
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started...");
});