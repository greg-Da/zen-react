import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import FileInput from "../../components/FileInput";

export default function UpdateUpdates() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const { id } = useParams();
  let navigate = useNavigate;

  useEffect(() => {
    fetch(`http://localhost:3000/updates/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          setTitle(data.data.title);
          setContent(data.data.content);
          setImage(data.data.image);
          setDisplayImage(data.data.image);
        } else {
          console.error(data.status.message);
          navigate("/admin/updates");
        }
      });
  }, [id, navigate]);

  function handleSubmit() {
    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("image", image);

    fetch(`http://localhost:3000/updates/${id}`, {
      method: "UPDATE",
      headers: {
        Authorization: Cookies.get("token"),
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  function addImage(e) {
    setImage(e.target.files[0]);
    setDisplayImage(URL.createObjectURL(e.target.files[0]));
  }

  function removeImage() {
    setImage("");
    setDisplayImage("");
  }

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <h1 className="font-bold text-3xl">Update {title}</h1>

      {image === "" ? (
        <div className="flex justify-center">
          <FileInput uploadFile={addImage} />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="relative">
            <div
              onClick={() => removeImage()}
              className="cursor-pointer bg-red-500 absolute top-1 right-1 rounded-full w-6 h-6 flex justify-center items-center"
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
            <img src={displayImage} alt={`Picture for ${title}`} />
          </div>
        </div>
      )}

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
          className="bg-green rounded-full py-1 px-3 text-xl font-bold text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
