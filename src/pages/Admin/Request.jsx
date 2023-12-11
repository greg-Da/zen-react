import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Request() {
  const [data, setData] = useState([
    {
      id: 1,
      date: "2022-01-01",
      time: "10:00",
      first_name: "John",
      last_name: "Doe",
      type: "Life Coaching",
    },
    {
      id: 1,
      date: "2022-01-01",
      time: "10:00",
      first_name: "John",
      last_name: "Doe",
      type: "Life Coaching",
    },
  ]);

  //   useEffect(() => {
  //     fetch("")
  //       .then((res) => res.json())
  //       .then((data) => setData(data));
  //   }, []);

  function updateAppointment(id, accepted) {
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        id,
        accepted
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <div>
        <h1 className="text-4xl font-bold">Appointment request</h1>
        {data.map((item) => (
          <div
            className="mt-3 p-2 border-2 border-black rounded-lg"
            key={item.id}
          >
            <div className="flex justify-between">
              <p className="font-bold text-xl">{item.date}</p>
              <p className="font-bold text-xl">{item.time}</p>
            </div>

            <div className="flex justify-between mt-2">
              <div>
                <p>
                  {item.first_name} {item.last_name}
                </p>
                <p>{item.type}</p>
              </div>

              <div className="flex">
                <button
                  onClick={() => updateAppointment(item.id, false)}
                  className="mr-2 bg-red-500 text-white rounded-lg font-bold text-lg px-3 py-1"
                >
                  Refuse
                </button>
                <button
                  onClick={() => updateAppointment(item.id, true)}
                  className="bg-green text-white rounded-lg font-bold text-lg px-3 py-1"
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
