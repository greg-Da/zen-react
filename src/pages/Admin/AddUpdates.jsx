import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileInput from "../../components/FileInput";
import apiUrl from "../../ApiConfig";

export default function AddUpdates() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageDisplay, setImageDisplay] = useState('');


  let navigate = useNavigate();

  function handleSubmit() {
    const data = new FormData();
    data.append("update[title]", title);
    data.append("update[content]", content);
    data.append("update[image]", image);

    fetch(`${apiUrl}/updates`, {
      method: "POST",
      headers: {
        Authorization: Cookies.get("token"),
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/admin/updates");
      })
      .catch((err) => console.log(err));
  }

  function handleImageUpload(e) {
    setImage(e.target.files[0]);
    setImageDisplay(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <h1 className="font-bold text-3xl">Add a new update</h1>
      <div className="flex justify-center">
        {imageDisplay && imageDisplay !== "" ? (
          <img className="w-auto h-auto " src={imageDisplay} />
        ) : (
          <FileInput uploadFile={handleImageUpload} />
        )}
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="mt-3 w-full border-2 border-gray-300 rounded-md p-2 mb-4"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border-2 border-gray-300 rounded-md p-2 mb-4"
        rows="10"
      ></textarea>

      <div className="flex justify-center">
        <button
          onClick={() => handleSubmit()}
          className="bg-green rounded-full py-1 px-3 text-2xl text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
