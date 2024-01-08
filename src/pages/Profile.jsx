import { useEffect } from "react";
import { useState } from "react";
import apiUrl from "../ApiConfig";

export default function Profile() {
  const [user, setuser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   useEffect(() => {
  //     fetch(`${apiUrl}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setuser(data.data);
  //         setEmail(data.data.email);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  function handleSubmit() {
    fetch(`${apiUrl}/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full py-4 px-4 lg:px-64">
      <h1 className="text-4xl my-4">
        {user.first_name} {user.last_name}
      </h1>

      <input
        className="mt-5 outline-none border-2 border-gray-300 rounded-full p-2 w-full mx-2"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mt-5 outline-none border-2 border-gray-300 rounded-full p-2 w-full mx-2"
        placeholder="Password"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-center mt-5">
        <button
          onClick={() => handleSubmit()}
          className="bg-green text-white rounded-full py-2 px-5 text-2xl font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
