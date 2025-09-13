import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

export const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [messageSuccess, setMessageSuccess] = useState(false);

    const handleSubmit = async (event) => {
    event.preventDefault();

    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (pmError) {
      console.log("Stripe | error creating payment method:", pmError.message);
      return;
    }

    console.log("Stripe 23 | token generated!", paymentMethod);

    const response = await axios.post("http://localhost:8080/stripe/charge", {
      amount: 999,
    });

    console.log("Stripe 35 | data", response.data);
    console.log("Stripe 36 | data.success", response.data.success);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      response.data.clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (error) {
      console.log("Stripe | payment error:", error.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("CheckoutForm.js 25 | payment successful!");
      setMessageSuccess(true);
      console.log("Stripe | full PaymentIntent object:", paymentIntent);
    }
  };

  return (
    <div>
      {!messageSuccess ? 
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
          <CardElement />
          <button>Pay</button>
        </form>
      :
        <div>
          <h2>Your payment was saccessful</h2>
          <p>Enjoy your purchase!</p>
        </div>
      }
    </div>
  );
};