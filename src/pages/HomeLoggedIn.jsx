import { useState } from "react";
import { useSelector } from "react-redux";
import CardMeeting from "../components/CardMeeting";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function HomeLoggedIn() {
  const currentUser = useSelector((state) => state.auth.user);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${currentUser.id}/invoices`, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.status.code === 200){
          setInvoices(data.data);
        }else{
          throw new Error(data.status.message)
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }, [currentUser]);

  const data = {
    upLeft: "01/01/2024",
    upRight: "3 PM",
    down: "Life coaching",
    id: 1,
  };


  return (
    <div className="w-full py-4 px-4 lg:px-64">
      <h1 className="text-4xl">Hello {currentUser.first_name}</h1>

      <Link
        to={"/appointment/new"}
        className="mt-3 flex justify-between items-center w-full rounded-lg bg-green p-3 text-white"
      >
        <p className="font-bold">Schedule a meeting</p>
        <i className="text-2xl fa-solid fa-circle-arrow-right"></i>
      </Link>

      <Link
        to={"/chat/1"}
        className="mt-5 flex justify-between items-center w-full rounded-lg bg-gray-300 p-3"
      >
        <p className="font-bold">Get in touch</p>
        <i className="text-2xl fa-solid fa-message"></i>
      </Link>

      <div className="mt-5">
        <h2 className="text-2xl">Your next appointments</h2>
        <div>
          <CardMeeting data={data} />
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl">Your Invoices</h2>
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="border-2 border-black mt-3 p-4 flex justify-between rounded-lg"
          >
            {invoice.status === "paid" ? (
              <p className="w-1/3 font-bold text-green">PAID</p>
            ) : (
              <p className="w-1/3 font-bold text-red-500">{invoice.status.toUpperCase()}</p>
            )}
            <div className="flex w-full items-center justify-around">
              <p>Amount: {invoice.total}$</p>
              <p>x{invoice.appointment_number}</p>
            </div>
            <i className="fa-solid fa-circle-arrow-down text-blue-500 text-2xl ml-2 cursor-pointer"></i>

          </div>
        ))}
      </div>
    </div>
  );
}
