import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import apiUrl from '../ApiConfig';

const CheckoutReturn = () => {
  const [status, setStatus] = useState(null);

  let { type, id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(
      `${apiUrl}/${type}/${id}/session-status?session_id=${sessionId}`, {
        headers: {
          Authorization: Cookies.get("token"),
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
      });
  }, [id, type]);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  if (status === "open") {
    return <Navigate to={`/checkout/${type}/${id}`} />;
  }

  if (status === "complete") {
    return (
      <section className="w-full py-4 px-4 lg:px-64 mt-5 text-center" id="success">
        <h1 className="text-2xl font-bold">Your payment has been successful</h1>
        <i className="fa-solid fa-spinner my-5 text-5xl animate-spin-slow rounded-full"></i>
        <p className="">You are going to redirected in a few seconds</p>
      </section>
    );
  }

  return null;
};

export { CheckoutReturn };
