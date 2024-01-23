import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import apiUrl from "../ApiConfig";

export default function AppointmentShow() {
  const [data, setData] = useState({});

  const currentUser = useSelector((state) => state.auth.user);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/users/${currentUser.id}/appointments/${id}`, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        console.log(data);
      });
  }, [currentUser, id]);

  function handleCancel() {
    fetch(`${apiUrl}/users/${currentUser.id}/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        status: "cancelled",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status.code === 200) {
          navigate("/");
        }
      });
  }

  function inThePast() {
    let date = new Date(data.datetime);
    date = new Date(date.setHours(date.getHours() - 1));
    let today = new Date();

    if (date < today) {
      return true;
    } else {
      return false;
    }
  }

  function lessThan1HourAway() {
    let date = new Date(data.datetime);
    date = new Date(date.setHours(date.getHours() - 1));
    let today = new Date();

    if (date - today < 3600000 && date - today > -3600000) {
      return true;
    } else {
      return false;
    }
  }

  function lessThan2Days() {
    let date = new Date(data.datetime);
    date = new Date(date.setHours(date.getHours() - 1));
    let today = new Date();

    if (date - today < 172800000) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="py-4 px-4 lg:px-64 mt-5 w-full">
      {!data.id ? (
        <div className="w-full flex justify-center">
          <i className="fa-solid fa-spinner my-5 text-5xl animate-spin-slow rounded-full"></i>
        </div>
      ) : (
        <>
          <div className="bg-green rounded-md p-3 text-white">
            <h1 className="text-2xl font-bold">
              Your appointment with {data.other_user_name}
            </h1>
            <div className="mt-3 flex justify-between">
              {data.datetime && (
                <p className="font-bold">
                  {new Date(data.datetime).getMonth() + 1}/
                  {new Date(data.datetime).getDate()}/
                  {new Date(data.datetime).getFullYear()} at{" "}
                  {data.datetime
                    .split("T")
                    .pop()
                    .split(".")
                    .shift()
                    .slice(0, -3)}
                </p>
              )}
              <p>
                Reason :{" "}
                <span className="font-bold">{data.appointment_type}</span>
              </p>
            </div>
          </div>
          <div className="bg-gray-300 rounded-md p-3 mt-5">
            {lessThan1HourAway() ? (
              <>
                <p className="font-bold">Link to your meeting</p>
                <a
                  href={data.link}
                  className="text-blue-500 font-bold mt-3 ml-4"
                >
                  {data.link}
                </a>
              </>
            ) : inThePast() ? (
              <p>The link is no longer available</p>
            ) : (
              <p>
                Patience the link will be available 1 hour before the meeting
              </p>
            )}
          </div>
          {!inThePast() && (
            <div
              className={`${
                !lessThan2Days() ? "flex justify-between items-end" : ""
              } bg-gray-300 rounded-md p-3 mt-5`}
            >
              {lessThan2Days() ? (
                <p className="mb-3 font-bold">
                  If you cancel within 2 days of the meeting, it's still
                  expected
                </p>
              ) : (
                <div>
                  <p className="mb-3 font-bold">Need to reschedule ?</p>
                  <button
                    onClick={() => navigate(`/reschedule/${id}`)}
                    className="bg-green text-white h-10 rounded-md py-1 px-3 text-xl font-bold"
                  >
                    Reschedule
                  </button>
                </div>
              )}
              <button
                onClick={() => handleCancel()}
                className="bg-red-500 text-white h-10 rounded-md py-1 px-3 text-xl font-bold"
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
