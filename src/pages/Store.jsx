import { useState } from "react";
import CardStore from "../components/CardStore/CardStore";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Store() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      image:
        "https://www.rover.com/blog/wp-content/uploads/2019/06/bernese-mountain-dog-1177074_1920.jpg",
      title: "Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi minus vitae error voluptates quis beatae a? Ab architecto rerum explicabo, delectus consequatur ea esse laboriosam sint ut assumenda saepe cum.",
      price: 100,
    },
    {
      id: 2,
      image:
        "https://www.rover.com/blog/wp-content/uploads/2019/06/bernese-mountain-dog-1177074_1920.jpg",
      title: "Title 2",
      description: "Lorem ipsum dolor",
      price: 100,
    },
    {
      id: 3,
      image:
        "https://www.rover.com/blog/wp-content/uploads/2019/06/bernese-mountain-dog-1177074_1920.jpg",
      title: "Title 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi minus vitae error voluptates quis beatae a? Ab architecto rerum explicabo, delectus consequatur ea esse laboriosam sint ut assumenda saepe cum.",
      price: 100,
    },
    {
      id: 4,
      image:
        "https://www.rover.com/blog/wp-content/uploads/2019/06/bernese-mountain-dog-1177074_1920.jpg",
      title: "Title 4",
      description: "Lorem ipsum dolor",
      price: 100,
    },
  ]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }, []);

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div
      className={`${
        openModal ? "overflow-hidden h-[88.5vh]" : ""
      } w-full py-4 px-4 lg:px-64 relative`}
    >
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
              <Link to={"/checkout"}>
                <button className="bg-green text-xl text-white py-1 px-2 rounded-lg">
                  Order
                </button>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
