import { useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "../components/TimePicker/TimePicker";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AlertContext } from "../components/Alert";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import apiUrl from "../ApiConfig";

export default function AppointmentNew() {
  const [data, setData] = useState({});
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("9");
  // -1 = loading / 0 = false / 1 = true 
  const [sesionsLeft, setSessionLeft] = useState(-1);
  const [appointment_type, setAppointmentType] = useState("Family");

  const currentUser = useSelector((state) => state.auth.user);

  const { setAlert } = useContext(AlertContext);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${apiUrl}/available_appointment`,
      {
        method: "GET",
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200 && data.data !== false) {
          setData(data.data);
        } else if (data.status.code === 200 && data.data === false) {
          data.data ? setSessionLeft(1) : setSessionLeft(0);
          console.log(data);
        } else {
          throw new Error(data.status.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setAlert({ text: err.message, type: "error" });
      });
  }, [setAlert, currentUser]);

  function handleSubmit() {
    let newDate = new Date(date.setHours(parseInt(time.split(":")[0])));
    newDate = new Date(date.setMinutes(parseInt(time.split(":")[1])));
    setDate(newDate);
    console.log(date);

    fetch(
      `${apiUrl}/users/${currentUser.id}/appointments/${data.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify({
          datetime: date,
          appointment_type,
          status: "unconfirmed",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status.code === 200) {
          navigate("/");
          setAlert({ text: "The request has been sent", type: "success" });
        } else {
          setAlert({ text: data.status.message, type: "error" });
        }
      });
  }

  return (
    <div className="py-4 px-4 lg:px-64 mt-5 w-full">
      {sesionsLeft === -1 ? (
        <div className="w-full flex justify-center">
          <i className="fa-solid fa-spinner my-5 text-5xl animate-spin-slow rounded-full"></i>
        </div>
      ) : sesionsLeft === 0 ? (
        <div className="bg-gray-300 p-3 font-bold text-2xl rounded-md text-center">
          <h1>Contact your doctor to get more session</h1>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">New your appointment</h1>
          <div className="bg-grey-300 rounded-md p-3">
            <div className="w-full flex flex-col items-center justify-center">
              <Calendar
                value={date}
                onChange={setDate}
                calendarType="gregory"
              />
              <TimePicker selectTime={setTime} />

              <div className="mt-4">
                <p className="text-bold text-xl mb-3">Type of session :</p>
                <select
                  className="p-2 rounded-md"
                  onChange={(e) => setAppointmentType(e.target.value)}
                >
                  <option value="Family">Family</option>
                  <option value="Councelling">Councelling</option>
                  <option value="Couple session">Couple session</option>
                </select>
              </div>

              <button
                onClick={() => handleSubmit()}
                className="mt-5 bg-green py-2 px-4 rounded-full text-2xl font-bold text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
