import { useRef } from "react";
import "./Chat.css";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState({
    id: 1,
    first_name: "Jay",
    last_name: "Gordosova",
  });
  const ref = useRef(null);

  // const user = useParams()

  //   useEffect(() => {
  //     fetch("")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUser(data.user);
  //         setMessages(data.messages);
  //       });
  //   }, []);

  function handleChange(e) {
    ref.current.style.height = ref.current.scrollHeight + "px";
    setNewMessage(e.target.value);
  }

  return (
    <div className="backgroundLeaves w-full bg-beige overflow-hidden">
      <div className="flex py-2 bg-beige border-b-2 border-black drop-shadow-lg justify-center">
        <h1 className="font-bold text-3xl">
          {user.first_name} {user.last_name}
        </h1>
      </div>

      <div className="h-[93%]">
        <div className="p-4 h-[inherit] overflow-y-scroll">
        </div>

        <div className="flex items-center bg-white border-2 border-black rounded-3xl mx-2 py-1 px-2">
          <textarea
            ref={ref}
            onChange={(e) => handleChange(e)}
            className="w-full max-h-20 h-6 resize-none  border-0 outline-none rounded-full"
            placeholder="Type your message"
            type="text"
          ></textarea>
          <i className="fa-solid fa-circle-right text-3xl cursor-pointer text-green"></i>
        </div>
      </div>
    </div>
  );
}
