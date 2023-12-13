import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Updates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/updates")
      .then((res) => res.json())
      .then((data) => {
        if (data.status.code === 200) {
          setUpdates(data.data);
        }else{
          throw new Error(data.status.message)
        }
      })
      .catch((err) => console.error(err));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:3000/updates/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpdates((prev) => prev.filter((update) => update.id !== id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <div className="flex justify-end">
        <Link to={"/admin/addUpdate"}>
          <button className="bg-blue-500 py-1 px-3 text-2xl font-bold rounded-full text-white">
            Add update
          </button>
        </Link>
      </div>
      {updates.map((update) => (
        <div
          key={update.id}
          className="mt-3 border-2 border-greay-500 flex items-center justify-between rounded-md p-4 mb-4"
        >
          <p className="text-xl font-bold">{update.title}</p>

          <div className="flex">
            <button
              onClick={() => handleDelete(update.id)}
              className="bg-red-500 text-white rounded-full py-2 px-5 text-xl font-bold mr-2"
            >
              Delete
            </button>
            <Link to={`/admin/updateUpdate/${update.id}`}>
              <button className="bg-orange-500 text-white rounded-full py-2 px-5 text-xl font-bold">
                Modify
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
