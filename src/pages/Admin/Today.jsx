import { useEffect } from "react";
import { useState } from "react";
import CardMeeting from "../../components/CardMeeting";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function Today() {
  const [appointments, setAppointments] = useState([]);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch(
      `http://localhost:3000/users/${
        currentUser.id
      }/appointments/by_date/${new Date().toISOString().slice(0, 10)}`,
      {
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAppointments(data.data);
      });
  }, [currentUser]);

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <h1 className="text-4xl font-bold">Hello {currentUser.first_name}</h1>

      <h2 className="mt-3 font-bold text-2xl">Today's appointments</h2>

      {appointments.map((item) => (
        <div key={item.id}>
          <CardMeeting
            data={{
              upLeft: item.datetime
                .split("T")
                .pop()
                .split(".")
                .shift()
                .slice(0, -3),
              upRight: item.other_user_name,
              type: item.appointment_type,
              id: item.id,
            }}
          />
        </div>
      ))}
    </div>
  );
}
