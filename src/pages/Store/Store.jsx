import { useState } from "react";
import CardStore from "../../components/CardStore/CardStore";
import { useEffect } from "react";
import "./Store.css";
import Cart from "../../components/Cart";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import apiUrl from "../../ApiConfig";

export default function Store() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch(`${apiUrl}/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.data);
      });
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      fetch(
        `${apiUrl}/cart`,
        {
          headers: {
            Authorization: Cookies.get("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCart(data.data.cart_items);
        });
    }
  }, [currentUser]);

  function updateCart(item) {
    const index = cart.findIndex((i) => i.item_id === item.id);

    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);

      fetch(
        `${apiUrl}/cart/cart_items/${cart[index].cart_item_id}`,
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
      fetch(
        `${apiUrl}/items/${item.id}/cart_items`,
        {
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
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          
          setCart((prev) => [...prev, data.data]);
        })
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += parseFloat(item.price) * item.quantity;
    });
    setTotalPrice(total);
  }, [cart])

  return (
    <div
      className={`${
        openModal ? "overflow-hidden h-[88.5vh]" : ""
      } w-full py-4 px-4 lg:px-64 relative`}
    >
      <Cart
        openModal={openModal}
        setOpenModal={setOpenModal}
        cart={cart}
        setCart={setCart}
        totalPrice={totalPrice}
      />

      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item, id) => (
          <CardStore key={id} data={item} setCart={updateCart} />
        ))}
      </div>
    </div>
  );
}
