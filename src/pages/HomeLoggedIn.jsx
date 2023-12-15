import { useState } from "react";
import { useSelector } from "react-redux";
import CardMeeting from "../components/CardMeeting";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function HomeLoggedIn() {
  const currentUser = useSelector((state) => state.auth.user);
  const [invoices, setInvoices] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    {
      currentUser.id &&
        fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/users/${currentUser.id}/invoices`, {
          headers: {
            Authorization: Cookies.get("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.status.code === 200) {
              setInvoices(data.data.reverse());
            } else {
              throw new Error(data.status.message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
    }
  }, [currentUser]);

  useEffect(() => {
    {
      currentUser.id &&
        fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/confirmed_appointments`, {
          headers: {
            Authorization: Cookies.get("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.status.code === 200) {
              setAppointments(data.data);
            } else {
              throw new Error(data.status.message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
    }
  }, [currentUser]);

  function downloadInvoice(id) {
    fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/invoices/${id}/download_pdf`, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const link = document.createElement('a');
        link.href = data.data;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = 'invoice.pdf';
        link.click();
      });
  }

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
        to={"/chat"}
        className="mt-5 flex justify-between items-center w-full rounded-lg bg-gray-300 p-3"
      >
        <p className="font-bold">Get in touch</p>
        <i className="text-2xl fa-solid fa-message"></i>
      </Link>

      <div className="mt-5">
        <h2 className="text-2xl">Your next appointments</h2>
        <div>
          {appointments.map((appointment) => (
            <CardMeeting
              key={appointment.id}
              data={{
                upLeft: [
                  ...appointment.datetime
                    .split("T")
                    .shift()
                    .split(".")
                    .pop()
                    .split("-")
                    .slice(1),
                  ...appointment.datetime
                    .split("T")
                    .shift()
                    .split(".")
                    .pop()
                    .split("-")
                    .slice(0, 1),
                ].join("/"),
                upRight: appointment.datetime
                  .split("T")
                  .pop()
                  .split(".")
                  .shift()
                  .slice(0, -3),
                type: appointment.appointment_type,
                id: appointment.id,
              }}
            />
          ))}
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
              <p className="w-1/3 font-bold text-red-500">
                {invoice.status.toUpperCase()}
              </p>
            )}
            <div className="flex w-full items-center justify-around">
              <p>Amount: {invoice.total}$</p>
              <p>x{invoice.appointment_number}</p>
            </div>
            <i
              onClick={() => downloadInvoice(invoice.id)}
              className="fa-solid fa-circle-arrow-down text-blue-500 text-2xl ml-2 cursor-pointer"
            ></i>
            {invoice.status === "unpaid" && (
              <Link to={`/checkout/invoices/${invoice.id}`}>
                <i className="fa-regular fa-credit-card text-blue-500 text-2xl ml-2 cursor-pointer"></i>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
