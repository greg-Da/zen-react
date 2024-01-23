import { useEffect } from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import apiUrl from "../ApiConfig";

const stripePromise = loadStripe(
  "pk_test_51NkTOXHGPrfYJoPuOg0oKfft9u1JLEHY3WxZc6Mcg0aZ1K3dApKIgBmoHtR9nktKPn8in1KFLacTWKuZ4RbIxUOT00cpGDi9mt"
);

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");

  let { type, id} = useParams()

  useEffect(() => {

    fetch(`${apiUrl}/${type}/${id}/create_checkout_session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get('token')
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
    <div className="w-full py-4 px-4 lg:px-64 mt-5" id="checkout">
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
