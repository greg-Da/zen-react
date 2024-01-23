import { useRef } from "react";
import "./Chat.css";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AlertContext } from "../../components/Alert";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import apiUrl from "../../ApiConfig";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [admins, setAdmins] = useState([]);
  const [contact, setContact] = useState(0);

  const ref = useRef(null);
  const { setAlert } = useContext(AlertContext);
  const currentUser = useSelector((state) => state.auth.user);

  let { id } = useParams();

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (id === undefined) {
      fetch(
        `${apiUrl}/index_admins`,
        {
          headers: {
            Authorization: Cookies.get("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAdmins(data.data);
        });
    } else {
      fetch(
        `${apiUrl}/users/${id}`,
        {
          headers: {
            Authorization: Cookies.get("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setContact(data.data);
        });
    }
  }, [id]);

  useEffect(() => {
    let userId;
    if (id === undefined) {
      userId = admins.length === 1 ? admins[0].id : contact;
    } else {
      userId = id;
    }

    {
      userId > 0 &&
        fetch(
          `${apiUrl}/users/${userId}/private_messages`,
          {
            method: "GET",
            headers: {
              Authorization: Cookies.get("token"),
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setMessages(data.data);
          });
    }
  }, [admins, contact, id]);

  function handleChange(e) {
    ref.current.style.height = 0;
    ref.current.style.height = ref.current.scrollHeight + "px";
    setNewMessage(e.target.value);
  }

  function sendMessage(retry = false) {
    let userId;
    if (id === undefined) {
      userId = admins.length === 1 ? admins[0].id : contact;
    } else {
      userId = id;
    }

    {
      userId > 0 &&
        fetch(
          `${apiUrl}/users/${userId}/private_messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: Cookies.get("token"),
            },
            body: JSON.stringify({
              content: newMessage,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.status.code === 201) {
              setMessages([...messages, data.data]);
              setNewMessage("");
            } else {
              if (retry) {
                throw new Error("Something went wrong");
              }
              setTimeout(() => {
                sendMessage(true);
              }, 1000);
            }
          })
          .catch((err) => {
            setAlert({ text: err.message, type: "error" });
          });
    }
  }

  return (
    <div className="backgroundLeaves w-full bg-beige overflow-hidden">
      <div className="fixed w-full z-40 flex pt-4 pb-2 bg-beige border-b-2 border-black drop-shadow-lg justify-center">
        {id === undefined ? (
          admins.length === 1 ? (
            <h1 className="text-2xl font-bold bg-transparent">
              {admins[0].first_name} {admins[0].last_name}
            </h1>
          ) : (
            <div className="relative px-2 border-transparent border hover:border-black rounded-full">
              <select
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                className="adminSelect text-center pr-6 text-2xl font-bold bg-transparent"
              >
                <option className="hidden" value="">
                  Choose contact
                </option>

                {admins.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.first_name} {admin.last_name}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down -ml-6 absolute z-[-1] top-1 text-2xl"></i>
            </div>
          )
        ) : (
          <h1 className="text-2xl font-bold bg-transparent">
            {contact.first_name} {contact.last_name}
          </h1>
        )}
      </div>

      <div className="h-[93%] mt-12">
        <div className="p-4 h-[inherit] overflow-y-scroll flex flex-col">
          {messages &&
            messages.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.sender_id === currentUser.id
                    ? "self-end bg-[#80ff80]"
                    : "bg-blue-300"
                } p-3  rounded-lg w-fit my-2`}
              >
                <p>{message.content}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center bg-white border-2 border-black rounded-3xl mx-2 py-1 px-2">
          <textarea
            ref={ref}
            onInput={(e) => handleChange(e)}
            className="w-full max-h-14 h-6 resize-none  border-0 outline-none rounded-full"
            placeholder="Type your message"
            type="text"
          ></textarea>
          <i
            onClick={() => sendMessage()}
            className="fa-solid fa-circle-right text-3xl cursor-pointer text-green"
          ></i>
        </div>
      </div>
    </div>
  );
}
