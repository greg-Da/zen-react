import { useEffect } from "react";
import { useState } from "react";
import apiUrl from "../../ApiConfig";
import Cookies from "js-cookie";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/orders`, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status.code === 200) {
          setOrders(data.data);
        } else {
          throw new Error(data.status.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function updateStatusOrder(type, id) {
    fetch(`${apiUrl}/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify({ status: type }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status.code === 200) {
          setOrders(data.data);
        } else {
          throw new Error(data.status.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleRefund(id) {
    fetch(`${apiUrl}/orders/${id}/refund`, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          alert("Refund request sent");
        } else {
          throw new Error(data.status.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    updateStatusOrder("refunded", id);
  }

  return (
    <div className="w-full py-4 px-4 lg:px-64">
      <h1 className="text-4xl font-bold">Orders</h1>
      <div>
        <p>Pending orders</p>

        <p>Sent orders</p>

        <p>Delivered orders</p>

        {orders.map((order) => (
          <div
            key={order.id}
            className="border-2 border-black mt-3 p-4 rounded-lg"
          >
            <div className="flex justify-between">
              <p
                className={`${
                  order.status === "refunded"
                    ? "text-red-500"
                    : order.status === "sent" || order.status === "delivered"
                    ? "text-green"
                    : ""
                }`}
              >
                {order.status}
              </p>
              <p>{order.total}$</p>
              {order.status === "paid" ? (
                <div className="flex">
                  <button onClick={() => updateStatusOrder("sent", order.id)}>
                    Sent
                  </button>
                  <button onClick={() => handleRefund(order.id)}>Refund</button>
                </div>
              ) : (
                order.status === "sent" && (
                  <button
                    onClick={() => updateStatusOrder("delivered", order.id)}
                  >
                    Delivered
                  </button>
                )
              )}
            </div>
            <div>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between mt-2">
                  <img src="" alt={`Picture of ${item.title}`} />
                  <p>{item.title}</p>
                  <p>x{item.quantity}</p>
                  <p>{item.price}$</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
