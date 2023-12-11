import { useState } from "react";
import { useEffect } from "react";
import CardMeeting from "../../../components/CardMeeting";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

export default function CalendarPage() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      time: "10:00 AM",
      type: "Life Coaching",
    },
  ]);
  const [date, setDate] = useState(new Date())

//   useEffect(() => {
//     fetch("")
//       .then((res) => res.json())
//       .then((data) => {
//         setAppointments(data);
//         console.log(data);
//       });
//   }, []);

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <div className="flex justify-center">
        <Calendar value={date} onChange={setDate} calendarType="US" />
      </div>

      <div>
        <h2 className="mt-5 font-bold text-2xl">Apointments for {date.getMonth()+1}/{date.getDate()}/{date.getFullYear()}</h2>
        {appointments.map((item) => (
          <div key={item.id}>
            <CardMeeting
              data={{
                upLeft: item.time,
                upRight: `${item.first_name} ${item.last_name}`,
                down: item.type,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
