import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";

export default function Invoice() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [price, setPrice] = useState("");
  const [nmbSession, setNmbSession] = useState("");

    useEffect(() => {
      fetch("http://localhost:3000/users",{
        headers: {
          Authorization: Cookies.get("token")
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setUsers(data);
          setFilteredUsers(data);
        });
    }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          `${user.first_name} ${user.last_name}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  function changeSelectedUser(id) {
    setSelectedUser(id);
    setPrice("");
    setNmbSession("");
  }

  function handleSubmit(id) {
    fetch(`http://localhost:3000/users/${id}/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        user_id: id,
        price: parseInt(price),
        nmb_session: parseInt(nmbSession),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <div className="flex w-full border-2 border-gray-300 rounded-full p-2">
        <input
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <i className="fa-solid fa-magnifying-glass text-gray-400 text-xl"></i>
      </div>

      <div className="border-t-2 border-black mt-5">
        {filteredUsers.map((user) => (
          <div
            onClick={() => changeSelectedUser(user.id)}
            key={user.id}
            className="cursor-pointer p-2 border-b-2 border-black"
          >
            <p className="text-center font-bold text-xl">
              {user.first_name} {user.last_name}
            </p>
            <div
              className={`${
                selectedUser === user.id ? "block" : "hidden"
              } mt-3`}
            >
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="outline-none mt-3 p-2 w-full border-2 border-gray-300 rounded-full"
                placeholder="Price"
                type="text"
              />
              <input
                value={nmbSession}
                onChange={(e) => setNmbSession(e.target.value)}
                className="outline-none mt-3 p-2 w-full border-2 border-gray-300 rounded-full"
                placeholder="Nmb of session"
                type="text"
              />

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleSubmit(user.id)}
                  className="bg-green rounded-full py-1 px-3 font-bold text-white text-xl"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
