import { useState } from "react";
import FileInput from "../../components/FileInput";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../ApiConfig";

export default function UpdateItems() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imagesDisplay, setImagesDisplay] = useState([]);
  const [images, setImages] = useState([]);
  const { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTitle(data.data.title);
        setPrice(data.data.price);
        setStock(data.data.stock);
        setDescription(data.data.description);
        setImages(data.data.images);
        setImagesDisplay(data.data.images);
      });
  }, [id]);

  function handleSubmit() {
    const data = new FormData();
    data.append("item[title]", title);
    data.append("item[description]", description);
    data.append("item[price]", price);
    data.append("item[stock]", stock);
    images.forEach((image) => {
      data.append(`item[images][]`, image);
    });

    fetch(`${apiUrl}/items/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: Cookies.get("token"),
      },
      body: data
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/product/${id}`)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleDelete() {
    fetch(`${apiUrl}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/store");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleFileUpload(e) {
    setImagesDisplay((prev) => [
      ...prev,
      URL.createObjectURL(e.target.files[0]),
    ]);
    setImages((prev) => [...prev, e.target.files[0]]);
  }

  function removeImage(index) {
    setImagesDisplay((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="py-4 px-4 lg:px-64 mt-5 w-full">
      <h1 className="text-3xl font-bold">Update {title}</h1>
      <div className="flex justify-center mt-5">
        <div
          className={`my-5 ${
            images.length === 0
              ? "flex justify-center"
              : "grid grid-cols-2 md:grid-cols-5 gap-4"
          }`}
        >
          {imagesDisplay.map((image, index) => (
            <div key={index} className="relative">
              <div onClick={() => removeImage(index)} className="cursor-pointer bg-red-500 absolute top-1 right-1 rounded-full w-6 h-6 flex justify-center items-center">
                <i className="fa-solid fa-xmark"></i>
              </div>
              <img className="w-auto h-auto" src={image} />
            </div>
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
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="text"
          placeholder="Stock"
          className="mt-5 outline-none border-2 border-gray-300 rounded-full p-2 w-full mx-2"
        />
        <textarea
          value={description}
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

        <button
          onClick={() => handleDelete()}
          className="bg-red-500 text-white rounded-full py-2 px-5 text-2xl font-bold"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
