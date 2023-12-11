import { useState } from "react";
import FileInput from "../../components/FileInput";
import Cookies from "js-cookie";

export default function AddArticles() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desciption, setDescription] = useState("");
  const [imagesDisplay, setImagesDisplay] = useState([]);
  const [images, setImages] = useState([]);

  const token = Cookies.get("token");

  function handleSubmit() {
    fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title,
        price: parseInt(price),
        desciption,
      }),
    })
      .then((res) => res.json())
        .then((data) => {
            console.log(data);
        
        })
        .catch((err) => {
            console.error(err);
        })
  }

  function handleFileUpload(e) {
    setImagesDisplay((prev) => [
      ...prev,
      URL.createObjectURL(e.target.files[0]),
    ]);
    setImages((prev) => [...prev, e.target.files[0]]);
  }

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <h1 className="text-3xl font-bold">Add Articles</h1>
      <div className="flex justify-center mt-5">
        <div className={`my-5 ${images.length === 0 ? "flex justify-center" : "grid grid-cols-2 md:grid-cols-5 gap-4"}`}>
          {imagesDisplay.map((image, index) => (
            <img className="w-auto h-auto " key={index} src={image} />
          ))}
          {images.length < 5 ? <FileInput uploadFile={handleFileUpload} /> : ""}
        </div>
      </div>

      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="mt-5 outline-none border-2 border-gray-300 rounded-full p-2 w-full mx-2"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          placeholder="Price"
          className="mt-5 outline-none border-2 border-gray-300 rounded-full p-2 w-full mx-2"
        />
        <textarea
          value={desciption}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="mt-5 resize-none outline-none border-2 border-gray-300 rounded-lg p-2 w-full mx-2"
          cols="30"
          rows="10"
        ></textarea>

        <div className="flex justify-center mt-5">
          <button
            onClick={() => handleSubmit()}
            className="bg-green text-white rounded-full py-2 px-5 text-2xl font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
