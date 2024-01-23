import { useState } from "react";
import { useEffect } from "react";
import CardMeeting from "../../../components/CardMeeting";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import apiUrl from "../../../ApiConfig";

export default function CalendarPage() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date());
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch(
      `${apiUrl}/users/${
        currentUser.id
      }/appointments/by_date/${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}
    `,
      {
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAppointments(data.data);
      });
  }, [currentUser, date]);

  function handleDateChange(date) {
    setDate(date);
  }

  return (
    <div className="py-4 px-4 lg:px-64 mt-5 w-full">
      <div className="flex justify-center">
        <Calendar value={date} onChange={handleDateChange} calendarType="gregory" />
      </div>

      <div>
        <h2 className="mt-5 font-bold text-2xl">
          Apointments for {date.getMonth() + 1}/{date.getDate()}/
          {date.getFullYear()}
        </h2>
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
    </div>
  );
}
