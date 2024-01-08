import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import TimePicker from "../components/TimePicker/TimePicker";
import { useContext } from "react";
import { AlertContext } from "../components/Alert";
import apiUrl from "../ApiConfig";

export default function AppointmentUpdate() {
  const [data, setData] = useState({});
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("9");
  const [appointment_type, setAppointmentType] = useState("");

  let currentUser = useSelector((state) => state.auth.user);
  let { id } = useParams();

  const { setAlert } = useContext(AlertContext);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/users/${currentUser.id}/appointments/${id}`, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setDate(new Date(data.data.datetime));
        setAppointmentType(data.data.appointment_type);
      });
  }, [currentUser, id]);

  function handleSubmit() {
    let newDate = new Date(date.setHours(parseInt(time.split(":")[0])));
    newDate = new Date(date.setMinutes(parseInt(time.split(":")[1])));
    setDate(newDate);
    console.log(date);

    fetch(`${apiUrl}/users/${currentUser.id}/appointments/${id}`, {
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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status.code === 200) {
          navigate("/");
        } else {
          setAlert({ text: data.status.message, type: "error" });
        }
      });
  }

  function lessThan2Days() {
    let currentDate = new Date(data.datetime);
    currentDate = new Date(currentDate.setHours(currentDate.getHours() - 1));
    let today = new Date();

    if (currentDate - today < 172800000) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      {lessThan2Days() ? (
        <h1 className="text-2xl font-bold">
          Rescheduling is not possible at this date
        </h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Reschedule your appointment</h1>
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
