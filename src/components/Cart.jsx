import Modal from "./Modal";
import { Link } from "react-router-dom";
import checkAuth from "../utils/checkAuth";
import Cookies from "js-cookie";

export default function Cart({ openModal, setOpenModal, cart, setCart }) {
  
  function removeFromCart(id) {
    const index = cart.findIndex((i) => i.item_id === id);

    fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/cart/cart_items/${cart[index].cart_item_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log("Item removed from cart successfully");
        } else {
          console.log("Error removing item from cart");
        }
      });

    setCart((prev) => prev.filter((item) => item.item_id !== id));
  }

  function updateItemQuantity(value, id) {
    const updatedCart = [...cart];
    updatedCart[id].quantity = value;
    setCart(updatedCart);
  }

  function updateCartItem(value, id) {
    console.log(value);
    const index = cart.findIndex((i) => i.item_id === id);
    fetch(`https://zen-counseling-production-4a7de6447247.herokuapp.com/cart/cart_items/${cart[index].cart_item_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({
        quantity: value,
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
  }
  return (
    <>
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
                    onBlur={(e) => updateCartItem(e.target.value, item.item_id)}
                    onChange={(e) => updateItemQuantity(e.target.value, id)}
                    value={item.quantity}
                  />
                </div>

                <i
                  onClick={() => removeFromCart(item.item_id)}
                  className="fa-solid fa-xmark cursor-pointer text-red-500 text-2xl"
                ></i>
              </div>
            ))}
            <div className="flex justify-end mt-2">
              {checkAuth() ? (
                <Link to={"/order/new"}>
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
    </>
  );
}
