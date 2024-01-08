import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiUrl from "../ApiConfig";

export default function OrderNew() {
  const [address, setAddress] = useState("");

  let navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

  function handleSubmit() {

    fetch(`${apiUrl}/users/${currentUser.id}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 201) {
            navigate(`/checkout/orders/${data.data.id}`)
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="w-full py-4 px-4 lg:px-64">
      <h1 className="text-2xl font-bold">Delivery address</h1>
      <input
        className="my-5 outline-none w-full border-2 rounded-full p-1"
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className="flex justify-center">
        <button
          onClick={() => handleSubmit()}
          className="bg-green py-1 px-3 rounded-full text-white font-bold text-xl"
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
}
