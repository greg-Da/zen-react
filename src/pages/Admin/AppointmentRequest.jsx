import Cookies from "js-cookie";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AlertContext } from "../../components/Alert";
import { useSelector } from "react-redux";

export default function AppointmentRequest() {
  const [appointments, setAppointments] = useState([]);

  const { setAlert } = useContext(AlertContext);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/pending_appointments`, {
      method: "GET",
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
        setAlert({ text: err.message, type: "error" });
      });
  }, [setAlert]);

  function updateRequest(accept, id) {
    fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/users/${currentUser.id}/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        status: accept ? 'confirmed' : 'cancelled',
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAppointments(appointments.filter((item) => item.id !== id));
      })
      .catch((err) => {
        setAlert({ text: err.message, type: "error" });

      })
  }

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <h1 className="text-2xl font-bold ">Appointment request</h1>
      <div className="mt-3">
        {appointments.map((item) => (
          <div key={item.id} className="p-3 border-2 border-black rounded-lg">
            <div className="font-bold text-xl flex justify-between">
              <p>{[...item.datetime.split('T').shift().split('.').pop().split('-').slice(1), ...item.datetime.split('T').shift().split('.').pop().split('-').slice(0, 1)].join('/')}</p>

              <p>
                {item.datetime.split("T").pop().split(".").shift().slice(0, -3)}
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <p>{item.other_user_name}</p>
                <p>{item.appointment_type}</p>
              </div>

              <div className="flex">
                <button
                  onClick={() => updateRequest(false, item.id)}
                  className="mr-2 bg-red-500 rounded-md py-1 px-2 text-white font-bold"
                >
                  Refuse
                </button>
                <button
                  onClick={() => updateRequest(true, item.id)}
                  className="bg-green rounded-md py-1 px-2 text-white font-bold"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
