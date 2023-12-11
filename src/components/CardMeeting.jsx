import { Link } from "react-router-dom";

export default function CardMeeting({ data: { upLeft, upRight, down, id } }) {
  return (
    <div className="p-3 border-2 border-black rounded-lg mt-2">
      <div className="flex justify-between">
        <p className="text-xl font-bold">{upLeft}</p>
        <p className="text-xl font-bold">{upRight}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p>{down}</p>
        <Link to={`/meeting/${id}`}>
          <button className="bg-green rounded-md py-1 px-2 text-white font-bold">Access meeting <i className="fa-solid fa-arrow-right"></i></button>
        </Link>
      </div>
    </div>
  );
}
