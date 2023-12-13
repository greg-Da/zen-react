import './TimePicker.css'

export default function TimePicker() {
  return (
    <div className="mt-4 text-xl flex border-2 rounded-full px-4 py-1">
      <select className="bg-transparent w-6">
        <option className="hidden" value="">
          --
        </option>
        <option value="09">9</option>
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
      <select className="bg-transparent w-6">
        <option className="hidden" value="">
          --
        </option>
        <option value="00">00</option>
        <option value="30">30</option>
      </select>
     
    </div>
  );
}
