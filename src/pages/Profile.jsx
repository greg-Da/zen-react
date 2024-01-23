import { useEffect } from "react";
import { useState } from "react";
import apiUrl from "../ApiConfig";
import Modal from "../components/Modal";
import Cookies from "js-cookie";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordChange, setPasswordChange] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/user_profile`, {
      method: "GET",
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail(data.data.email);
        setFirstName(data.data.first_name);
        setLastName(data.data.last_name);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit() {
    fetch(`${apiUrl}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          email,
          current_password: password,
          password: passwordNew,
          password_confirmation: passwordConfirmation,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPasswordChange(false);
        setPasswordNew("");
        setPasswordConfirmation("");
        setPassword("");
      
      })
      .catch((err) => console.log(err));
  }

  function handleOpenmodale(deleteAction) {
    deleteAction ? setDeleteAccount(true) : setDeleteAccount(false);
    setOpenModal(true);
  }

  return (
    <div className="w-full py-4 px-4 lg:px-64 mt-5">
      <h1 className="text-3xl font-bold mb-5">My account</h1>
      <div className="border-2 rounded p-3 bg-gray-300">
        <p className="font-bold text-xl">First Name</p>

        <div className="h-8">
          <input
            type="text"
            className={`${
              editFirstName ? "block" : "hidden"
            } outline-none border-2 border-gray-300 rounded-full py-1 px-2 w-full`}
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div
            className={`${
              editFirstName ? "hidden" : "block"
            } flex align-center justify-between`}
          >
            <p className="font-bold">{firstName}</p>
            <button
              onClick={() => setEditFirstName(true)}
              className="bg-gray-500 rounded-sm text-white font-bold px-2"
            >
              Edit
            </button>
          </div>
        </div>

        <p className="font-bold text-xl">Last Name</p>

        <div className="h-8">
          <input
            type="text"
            className={`${
              editLastName ? "block" : "hidden"
            } outline-none border-2 border-gray-300 rounded-full py-1 px-2 w-full`}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <div
            className={`${
              editLastName ? "hidden" : "block"
            } flex align-center justify-between`}
          >
            <p className="font-bold">{lastName}</p>
            <button
              onClick={() => setEditLastName(true)}
              className="bg-gray-500 rounded-sm text-white font-bold px-2"
            >
              Edit
            </button>
          </div>
        </div>

        <p className="font-bold text-xl">Email</p>
        <div className="h-8">
          <input
            type="email"
            className={`${
              editEmail ? "block" : "hidden"
            } outline-none border-2 border-gray-300 rounded-full py-1 px-2 w-full`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            className={`${
              editEmail ? "hidden" : "block"
            } flex align-center justify-between`}
          >
            <p className="font-bold">{email}</p>
            <button
              onClick={() => setEditEmail(true)}
              className="bg-gray-500 rounded-sm text-white font-bold px-2"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <p className="mt-5 font-bold text-xl">Password</p>
      <button
        className={`${
          passwordChange ? "hidden" : "block"
        } bg-blue-400 py-1 px-2 rounded-md text-white mt-3`}
        onClick={() => setPasswordChange(true)}
      >
        Update password
      </button>

      <div className={`${passwordChange ? "block" : "hidden"}`}>
        <input
          className="mt-5 outline-none border-2 border-gray-300 rounded-full p-2 w-full mx-2"
          placeholder="New Password"
          type="text"
          value={passwordNew}
          onChange={(e) => setPasswordNew(e.target.value)}
        />
        <input
          className="mt-5 outline-none border-2 border-gray-300 rounded-full p-2 w-full mx-2"
          placeholder="Password Confirmation"
          type="text"
          value={password}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      <p className="mt-5 font-bold text-xl">Account removal</p>

      <button
        className={`bg-red-500 py-1 px-2 rounded-md text-white mt-3`}
        onClick={() => handleOpenmodale(true)}
      >
        Delete account
      </button>

      <div
        className={`${
          passwordChange || editEmail || editFirstName || editLastName
            ? "block"
            : "hidden"
        } flex justify-center mt-5`}
      >
        <button
          onClick={() => handleOpenmodale(false)}
          className={`${
            editFirstName ? "" : ""
          } bg-green text-white rounded-full py-2 px-5 text-2xl font-bold`}
        >
          Submit
        </button>
      </div>

      <Modal open={openModal} closeModal={setOpenModal}>
        <p
          className={`${
            deleteAccount ? "block" : "hidden"
          } text-center text-xl font-bold mb-4`}
        >
          You are about to delete your account, <br />
          <span className="text-red-500">this action is irreversible</span>{" "}
        </p>
        <p
          className={`${
            deleteAccount ? "" : "text-center text-xl font-bold mb-3"
          }`}
        >
          Please type your password to proceed
        </p>
        <input
          className={`mt-2 outline-none border-2 border-gray-300 rounded-full p-2 w-full mx-2`}
          type="password"
          placeholder="Password"
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
      </Modal>
    </div>
  );
}
