import { useState } from "react";
import CardStore from "../../components/CardStore/CardStore";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import checkAuth from "../../utils/checkAuth";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import "./Store.css";

export default function Store() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  // const [cartItems, setCartItems] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/cart`, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCart(data.data.cart_items);
        // setCartItems(data.data.cart_items);
      });
  }, [currentUser]);

  function removeFromCart(id) {
    const index = cart.findIndex((i) => i.item_id === id);

    setCart((prev) => prev.filter((item) => item.id !== id));
    fetch(`http://localhost:3000/cart/cart_items/${cartItems[index].id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      }
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status.code === 200) {
            console.log("Item removed from cart successfully");
          } else {
            console.log("Error removing item from cart");
          }
        }),
    });
  }

  function updateCart(item) {
    const index = cart.findIndex((i) => i.item_id === item.id);

    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);

      fetch(`http://localhost:3000/cart/cart_items/${cart[index].cart_item_id}`, {
        method: "UPDATE",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify({
          quantity: updatedCart[index].quantity,
        }),
      })
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
      const newItem = { ...item, quantity: 1 };
      setCart((prev) => [...prev, newItem]);

      fetch(`http://localhost:3000/items/${item.id}/cart_items`, {
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
          console.log(data);
        })
        .catch((err) => console.error(err));
    }
  }

  function updateItemQuantity(value, id) {
    const updatedCart = [...cart];
    updatedCart[id].quantity = value;
    setCart(updatedCart);
  }

  function updateCartItem(value, id) {
    console.log(value);
    const indexCartItems = cart.findIndex((i) => i.item_id === id);
    fetch(`http://localhost:3000/cart_items/${cartItems[indexCartItems].id}`, {
      method: "UPDATE",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        quantity: value,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status.code === 200) {
            console.log("Item quantity updated successfully");
          } else {
            console.log("Error updating item quantity");
          }
        })
        .catch((err) => console.error(err)),
    });
  }

  return (
    <div
      className={`${
        openModal ? "overflow-hidden h-[88.5vh]" : ""
      } w-full py-4 px-4 lg:px-64 relative`}
    >
      {checkAuth() ? (
        <div className="flex justify-end">
          <div
            onClick={() => {
              setOpenModal(true);
            }}
            className="cursor-pointer bg-green rounded-full flex justify-center items-center h-10 w-10"
          >
            <i className="text-white text-xl fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item, id) => (
          <CardStore key={id} data={item} setCart={updateCart} />
        ))}
      </div>

      <Modal open={openModal} closeModal={setOpenModal}>
        <p className="text-2xl font-bold mb-5">Cart</p>
        {cart.length === 0 ? (
          <p className="text-center">There is nothing in the cart</p>
        ) : (
          <div>
            {cart.map((item, id) => (
              <div
                key={id}
                className="pb-2 flex items-center justify-between border-b-2 border-black"
              >
                <img
                  className="w-16 h-16 object-cover"
                  src={item.image}
                  alt={`Picture of ${item.name}`}
                />
                <div className="mx-2 w-full flex justify-between">
                  <p className="text-2xl font-bold">{item.name}</p>
                  <p className="text-2xl font-bold">{item.total_price}$</p>
                  <input
                    className="w-12 border rounded-sm"
                    type="number"
                    min={"1"}
                    onBlur={(e) => updateCartItem(e.target.value, item.id)}
                    onChange={(e) => updateItemQuantity(e.target.value, id)}
                    value={item.quantity}
                  />
                </div>

                <i
                  onClick={() => removeFromCart(item.id)}
                  className="fa-solid fa-xmark cursor-pointer text-red-500 text-2xl"
                ></i>
              </div>
            ))}
            <div className="flex justify-end mt-2">
              {checkAuth() ? (
                <Link to={"/checkout"}>
                  <button className="bg-green text-xl text-white py-1 px-2 rounded-lg">
                    Order
                  </button>
                </Link>
              ) : (
                <Link to={"/login"}>
                  <button className="bg-green text-xl text-white py-1 px-2 rounded-lg">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
