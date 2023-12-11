import { useState } from "react";
import CardStore from "../components/CardStore/CardStore";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import checkAuth from "../utils/checkAuth";

export default function Store() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  // useEffect(() => {
  //   checkAuth()
  //     ? fetch("")
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setCart(data);
  //         })
  //     : "";
  // }, []);

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
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
          <CardStore key={id} data={item} setCart={setCart} />
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
                  alt={`Picture of ${item.title}`}
                />
                <div className="mx-2 w-full flex justify-between">
                  <p className="text-2xl font-bold">{item.title}</p>
                  <p className="text-2xl font-bold">{item.price}$</p>
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
