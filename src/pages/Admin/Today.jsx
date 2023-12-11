import { useEffect } from "react";
import { useState } from "react";
import CardMeeting from "../../components/CardMeeting";

export default function Today() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      time: "10:00 AM",
      type: "Life Coaching",
    },
  ]);

  //   useEffect(() => {
  //     fetch("")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setAppointments(data.appointments);
  //       });
  //   }, []);

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <h1 className="text-4xl font-bold">Hello {}</h1>

      <h2 className="mt-3 font-bold text-2xl">Today's appointments</h2>

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
  );
}
