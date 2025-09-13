import express from 'express';
import 'dotenv/config';
import Stripe from 'stripe';
import cors from 'cors';

// const express = require("express");
const app = express();
// require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());
// const bodyParser = require("body-parser");
// const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

app.post("/stripe/charge", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      // payment_method: id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", 
      },
      // confirm: true,
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      clientSecret: payment.client_secret,
      // message: "Payment Successful",
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