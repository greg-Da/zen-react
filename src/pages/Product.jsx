import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";

export default function Product() {
  const currentUser = useSelector((state) => state.auth.user);

  const [item, setItem] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [cart, setCart] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  const { id } = useParams();

  useEffect(() => {
    fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log(data.data)
          setItem(data.data);
          setImages(data.data.images);
          setSelectedImage(data.data.images[0]);
        } else {
          throw new Error(data.status.message);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (currentUser.id) {
      fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/cart`, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCart(data.data.cart_items);
        });
    }
  }, [currentUser]);

  function updateCart() {
    const index = cart.findIndex((i) => i.item_id === item.id);

    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);

      fetch(
        `https://zen-counseling-production-4a7de6447247.herokuapp.com/cart/cart_items/${cart[index].cart_item_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookies.get("token"),
          },
          body: JSON.stringify({
            quantity: updatedCart[index].quantity,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status.code === 200) {
            console.log("Item quantity updated successfully");
          } else {
            console.log("Error updating item quantity");
          }
        })
        .catch((err) => console.error(err));
    } else {
      fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/items/${item.id}/cart_items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify({
          item_id: item.id,
          cart_id: currentUser.id,
          quantity: 1,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCart((prev) => [...prev, data.data]);
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <Cart
        openModal={openModal}
        setOpenModal={setOpenModal}
        cart={cart}
        setCart={setCart}
      />
      
      {currentUser.admin && (
        <div className="flex justify-end my-5">
          <Link to={`/admin/updateItems/${id}`}>
            <button className="bg-orange-500 rounded-full py-1 px-3 text-white text-2xl font-bold">
              Update
            </button>
          </Link>
        </div>
      )}
      <div className="flex justify-center">
        <img
          className="w-[32rem] h-[32rem] object-cover"
          src={selectedImage}
          alt={`Picture ${item.title}`}
        />
      </div>

      <div className="mt-5 cursor-pointer grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {images.map((image, id) => (
          <img
            onClick={() => setSelectedImage(image)}
            key={id}
            src={image}
            className="h-32 w-32 object-cover"
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
          onClick={() => updateCart()}
          className="mt-5 bg-green py-1 px-3 rounded-full font-bold text-white text-2xl"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
