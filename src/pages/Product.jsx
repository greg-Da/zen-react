import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Product() {
  const currentUser = useSelector((state) => state.auth.user);

  const [item, setItem] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.status.code === 200){
          setItem(data.data);
          setImages(data.data.images);
          setSelectedImage(data.data.images[0]);
        }else{
          throw new Error(data.status.message)
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  function addToCart() {
    fetch(`http://localhost:3000/items/${id}/cart_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      {currentUser.admin && (
        <div className="flex justify-end">
          <Link to={`/admin/updateArticles/${id}`}>
            <button className="bg-orange-500 rounded-full py-1 px-3 text-white text-2xl font-bold mb-5">
              Update
            </button>
          </Link>
        </div>
      )}
      <div className="flex justify-center">
        <img className="w-96 h-96" src={selectedImage} alt={`Picture ${item.title}`} />
      </div>

      <div className="mt-5 cursor-pointer grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {images.map((image, id) => (
          <img
            onClick={() => setSelectedImage(image)}
            key={id}
            src={image}
            className=""
          />
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <p className="font-bold text-2xl">{item.title}</p>
        <p className="font-bold text-2xl">{item.price}$</p>
      </div>
      <p className="mt-5">{item.description}</p>

      <div className="flex justify-center">
        <button
          onClick={() => addToCart()}
          className="mt-5 bg-green py-1 px-3 rounded-full font-bold text-white text-2xl"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
