import { useState } from "react";
import "./TimePicker.css";
import { useEffect } from "react";

export default function TimePicker({ selectTime }) {
  const [hour, setHour] = useState("09");
  const [min, setMin] = useState("00");

  useEffect(() => {
    selectTime(`${hour}:${min}`);
  }, [hour, min, selectTime]);

  return (
    <div className="mt-4 text-xl flex border-2 rounded-full px-4 py-1">
      <select
        onChange={(e) => setHour(e.target.value)}
        className="bg-transparent w-6 timePicker"
      >
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
      </select>
      <span>:</span>
      <select
        onChange={(e) => setMin(e.target.value)}
        className="bg-transparent w-6 timePicker"
      >
        <option value="00">00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
    </div>
  );
}
