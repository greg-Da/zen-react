import { useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "../components/TimePicker/TimePicker";

export default function AppointmentNew() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([{
    time: "9:00 AM",
  }]);
// FROM 9AM TO 5PM
  console.log(date)
  console.log(new Date())
  return (
    <div className="w-full py-4 px-4 lg:px-64">
      <div className="w-full flex flex-col items-center justify-center">
        <Calendar value={date} onChange={setDate} calendarType="US" />
        <TimePicker />

        <div className="bg-gray-500 w-full h-96">
          <div>
            <div><p>9</p></div>
          </div>
        </div>

        <button className="mt-5 bg-green py-2 px-4 rounded-full text-2xl font-bold text-white">Submit</button>
      </div>
    </div>
  );
}
