import { Link } from "react-router-dom";
import "./CardStore.css";
import checkAuth from "../../utils/checkAuth";

export default function CardStore({
  data: { id, image, title, price, description },
  setCart,
}) {
  function addToCart() {
    setCart({ id, image, title, price, description });
  }

  return (
    <div className="border-2 border-black rounded-lg">
      <div className="flex justify-center">
        <Link className="w-full" to={`/product/${id}`}>
          <img className="w-full h-64 object-cover" src={image} alt={`Picture of ${title}`} />
        </Link>
      </div>

      <div className="p-2 relative" style={{minHeight: '8em'}}>
        <div className="flex justify-between mt-2">
          <Link to={`/product/${id}`}>
            <p className="font-bold text-xl">{title}</p>
          </Link>

          <p className="font-bold text-xl">{price}$</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="clamp-2 h-12 w-5/6">{description}</p>

          {checkAuth() ? (
            <div
              onClick={() => addToCart()}
              className="absolute bottom-1 right-1 cursor-pointer bg-green rounded-full h-10 w-10 flex justify-center items-center"
            >
              <i className="fa-solid fa-cart-arrow-down text-white text-xl"></i>
            </div>
          ) : (
            <Link to={"/login"}>
              <div className="absolute bottom-2 right-2 cursor-pointer bg-green rounded-full h-10 w-10 flex justify-center items-center">
                <i className="fa-solid fa-cart-arrow-down text-white text-xl"></i>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
