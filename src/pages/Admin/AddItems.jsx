import { useState } from "react";
import FileInput from "../../components/FileInput";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AlertContext } from "../../components/Alert";

export default function AddItems() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imagesDisplay, setImagesDisplay] = useState([]);
  const [images, setImages] = useState([]);

  const { setAlert } = useContext(AlertContext);

  let navigate = useNavigate()

  function handleSubmit() {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append(`item[images][]`, image);
    });
    formData.append("item[title]", title);
    formData.append("item[price]", price);
    formData.append("item[stock]", stock);
    formData.append("item[description]", description);

    fetch("https://zen-counseling-production-4a7de6447247.herokuapp.com/items", {
      method: "POST",
      headers: {
        Authorization: Cookies.get("token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if(data.status.code === 201){
          navigate("/admin/addArticles")
        }else{
          throw new Error(data.status.message)
        }
      })
      .catch((err) => {
        console.error(err);
        setAlert({ text: err.message, type: "error" });
      });
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
        <div
          className={`my-5 ${
            images.length === 0
              ? "flex justify-center"
              : "grid grid-cols-2 md:grid-cols-5 gap-4"
          }`}
        >
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
      </div>
    </div>
  );
}
