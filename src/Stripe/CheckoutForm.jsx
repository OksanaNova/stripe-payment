import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export const CheckoutForm = () => {
  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: elements.getElement(CardElement),
  //   });

  //   if (!error) {
  //     console.log("Stripe 23 | token generated!", paymentMethod);
  //       try {
  //       const { id } = paymentMethod;
  //       const response = await axios.post(
  //         "http://localhost:8080/stripe/charge",
  //         {
  //           amount: 999,
  //           id: id,
  //         }
  //       );

  //       console.log("Stripe 35 | data", response.data.success);
  //       if (response.data.success) {
  //         console.log("CheckoutForm.js 25 | payment successful!");
  //       }
  //     } catch (error) {
  //       console.log("CheckoutForm.js 28 | ", error);
  //     }
  //   } else {
  //     console.log(error.message);
  //   }
  // };

  // рабочий вариант

  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // 1. Получаем clientSecret с бэка
  //   const { data } = await axios.post("http://localhost:8080/stripe/charge", {
  //     amount: 999,
  //   });

  //   // 2. Подтверждаем платёж на фронте
  //   const { error, paymentIntent } = await stripe.confirmCardPayment(
  //     data.clientSecret,
  //     {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //       },
  //     }
  //   );

  //   if (error) {
  //     console.log("Payment error:", error.message);
  //   } else if (paymentIntent.status === "succeeded") {
  //     console.log("Payment successful!");
  //   }
  // };
  // рабочий вариант конец

    const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 👉 1. Создаем PaymentMethod (для логов, как раньше)
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (pmError) {
      console.log("Stripe | error creating payment method:", pmError.message);
      return;
    }

    console.log("Stripe 23 | token generated!", paymentMethod);

    // 👉 2. Запрашиваем clientSecret у бэка
    const response = await axios.post("http://localhost:8080/stripe/charge", {
      amount: 999,
    });

    console.log("Stripe 35 | data", response.data);
    console.log("Stripe 36 | data.success", response.data.success);

    // 👉 3. Подтверждаем платеж
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
      console.log("Stripe | full PaymentIntent object:", paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};