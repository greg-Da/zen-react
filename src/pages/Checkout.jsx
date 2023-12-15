import { useEffect } from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_QZRZ9dVzzgcQLtF3ZHXA8ncR"
);

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");

  let { type, id} = useParams()

  useEffect(() => {

    fetch(`http://localhost:3000/${type}/${id}/create_checkout_session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url: `/checkout/${type}/${id}/return`,
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [type, id]);

  return (
    <div className="w-full py-4 px-4 lg:px-64" id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export { CheckoutForm };
