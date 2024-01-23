import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiUrl from "../ApiConfig";
import Modal from "../components/Modal";
import { useEffect } from "react";

export default function OrderNew() {
  const [billingName, setBillingName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingAddressOptional, setBillingAddressOptional] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingPhone, setBillingPhone] = useState("");

  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingAddressOptional, setShippingAddressOptional] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZipCode, setShippingZipCode] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

  const [differentBillingShipping, setDifferentBillingShipping] =
    useState(false);
  const [showModal, setShowModal] = useState(false);

  let navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch(`${apiUrl}/previous_order`, {
      headers: {
        Authorization: Cookies.get("token"),
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status.code === 200) {
          if(data.previous_order ){
            // setBillingName(data.data.billing_name);
            // setBillingAddress(data.data.billing_address);
            // setBillingAddressOptional(data.data.billing_address_optional);
            // setBillingCity(data.data.billing_city);
            // setBillingState(data.data.billing_state);
            // setBillingZipCode(data.data.billing_zip_code);
            // setBillingCountry(data.data.billing_country);
            // setBillingPhone(data.data.billing_phone);
            // setShippingName(data.data.shipping_name);
            // setShippingAddress(data.data.shipping_address);
            // setShippingAddressOptional(data.data.shipping_address_optional);
            // setShippingCity(data.data.shipping_city);
            // setShippingState(data.data.shipping_state);
            // setShippingZipCode(data.data.shipping_zip_code);
            // setShippingCountry(data.data.shipping_country);
            // setShippingPhone(data.data.shipping_phone);
          }
        }
      
      })
  }, [])


  function handleSubmit() {
    const data = {
      billing_name: billingName,
      billing_address: billingAddress,
      billing_address_optional: billingAddressOptional,
      billing_city: billingCity,
      billing_state: billingState,
      billing_zip_code: billingZipCode,
      billing_country: billingCountry,
      billing_phone: billingPhone,
      shipping_name: differentBillingShipping ? shippingName : billingName,
      shipping_address: differentBillingShipping
        ? shippingAddress
        : billingAddress,
      shipping_address_optional: differentBillingShipping
        ? shippingAddressOptional
        : billingAddressOptional,
      shipping_city: differentBillingShipping ? shippingCity : billingCity,
      shipping_state: differentBillingShipping ? shippingState : billingState,
      shipping_zip_code: differentBillingShipping
        ? shippingZipCode
        : billingZipCode,
      shipping_country: differentBillingShipping
        ? shippingCountry
        : billingCountry,
      shipping_phone: differentBillingShipping ? shippingPhone : billingPhone,
    };

    fetch(`${apiUrl}/users/${currentUser.id}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 201) {
          navigate(`/checkout/orders/${data.data.id}`);
        }
      })
      .catch((err) => console.log(err));
  }

  function infoFilled() {
    if (
      billingName === "" ||
      billingAddress === "" ||
      billingCity === "" ||
      billingState === "" ||
      billingZipCode === "" ||
      billingCountry === ""
    ) {
      return false;
    }
    if (differentBillingShipping) {
      if (
        shippingName === "" ||
        shippingAddress === "" ||
        shippingCity === "" ||
        shippingState === "" ||
        shippingZipCode === "" ||
        shippingCountry === ""
      ) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="w-full py-4 px-4 lg:px-64 mt-5">
      <h1 className="text-2xl font-bold">Your address</h1>

      <div>
        <h2 className="mt-3 font-bold">Billing information</h2>
        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Full Name"
          value={billingName}
          onChange={(e) => setBillingName(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="City"
          value={billingCity}
          onChange={(e) => setBillingCity(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Address Line 1"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Address Line 2 (optional)"
          value={billingAddressOptional}
          onChange={(e) => setBillingAddressOptional(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="State/Province/Region"
          value={billingState}
          onChange={(e) => setBillingState(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="ZIP/Postal Code"
          value={billingZipCode}
          onChange={(e) => setBillingZipCode(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Country"
          value={billingCountry}
          onChange={(e) => setBillingCountry(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Phone (Optional)"
          value={billingPhone}
          onChange={(e) => setBillingPhone(e.target.value)}
        />
      </div>

      <div className="flex items-center mt-4">
        <input
          className="mr-2 accent-blue-500 h-5 w-5"
          type="checkbox"
          onChange={(e) => setDifferentBillingShipping(e.target.checked)}
        />
        <p>Your shipping informations are different</p>
      </div>

      <div className={`${differentBillingShipping ? "" : "hidden"}`}>
        <h2 className="mt-3 font-bold">Shipping information</h2>

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Full Name"
          value={shippingName}
          onChange={(e) => setShippingName(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="City"
          value={shippingCity}
          onChange={(e) => setShippingCity(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Address Line 1"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Address Line 2 (optional)"
          value={shippingAddressOptional}
          onChange={(e) => setShippingAddressOptional(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="State/Province/Region"
          value={shippingState}
          onChange={(e) => setShippingState(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="ZIP/Postal Code"
          value={shippingZipCode}
          onChange={(e) => setShippingZipCode(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Country"
          value={shippingCountry}
          onChange={(e) => setShippingCountry(e.target.value)}
        />

        <input
          className="my-2 outline-none w-full border-2 rounded-full p-1"
          type="text"
          placeholder="Phone (Optional)"
          value={shippingPhone}
          onChange={(e) => setShippingPhone(e.target.value)}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          disabled={!infoFilled()}
          onClick={() => setShowModal(true)}
          className={`${
            infoFilled() ? "bg-green" : "bg-gray-400"
          } py-1 px-3 rounded-full text-white font-bold text-xl`}
        >
          Continue
        </button>
      </div>

      <Modal open={showModal} closeModal={setShowModal}>
        <p className="text-3xl font-bold">Confirm your informations</p>
        <p className="text-2xl font-bold mt-8 mb-2">Billing information</p>

        <div className="flex flex-wrap">
          <p className="w-1/2 my-2">
            <span className="font-bold">Name :</span> {billingName}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">City :</span> {billingCity}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">Address Line 1 :</span> {billingAddress}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">Address Line 2 :</span>{" "}
            {billingAddressOptional}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">State/Province/Region :</span>{" "}
            {billingState}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">ZIP/Postal Code :</span>{" "}
            {billingZipCode}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">Country :</span> {billingCountry}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">Phone :</span> {billingPhone}
          </p>
        </div>

        <p className="text-2xl font-bold mt-8 mb-2">Shipping information</p>

        <div className="flex flex-wrap">
          <p className="w-1/2 my-2">
            <span className="font-bold">Name :</span> {shippingName}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">City :</span> {shippingCity}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">Address Line 1 :</span>{" "}
            {shippingAddress}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">Address Line 2 :</span>{" "}
            {shippingAddressOptional}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">State/Province/Region :</span>{" "}
            {shippingState}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">ZIP/Postal Code :</span>{" "}
            {shippingZipCode}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">Country :</span> {shippingCountry}
          </p>

          <p className="w-1/2 my-2">
            <span className="font-bold">Phone :</span> {shippingPhone}
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => handleSubmit()}
            className="bg-green py-1 px-3 rounded-full text-white font-bold text-xl"
          >
            Proceed to payment
          </button>
        </div>
      </Modal>
    </div>
  );
}
