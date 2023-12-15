import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch("https://zen-counseling-production-4a7de6447247.herokuapp.com/users", {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.data);
        setFilteredUsers(data.data);
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
          <Link to={`/admin/chat/${user.id}`} key={user.id}>
            <div className="cursor-pointer p-2 border-b-2 border-black">
              <p className="text-center font-bold text-xl">
                {user.first_name} {user.last_name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
