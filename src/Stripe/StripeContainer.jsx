import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51S6EoqRoX5NbQNxOH3BD1wCsbTtQXyab7aEoq593A3CdQTPVR7cBLkGWTOnhcQb6kol5gpFvCA260AuLAYZnzpE000Zqpi35sc";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;