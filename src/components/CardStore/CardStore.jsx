import { Link } from "react-router-dom";
import "./CardStore.css";

export default function CardStore({
  data: { id, image, title, price, description }, setCart
}) {

    function addToCart() {
        setCart(prev => [...prev, { id, image, title, price, description }])
    }

  return (
    <div className="border-2 border-black rounded-lg">
      <Link to={`/product/${id}`}>
        <img src={image} alt={`Picture of ${title}`} />
      </Link>

      <div className="p-2">
        <div className="flex justify-between mt-2">
          <Link to={`/product/${id}`}>
            <p className="font-bold text-xl">{title}</p>
          </Link>

          <p className="font-bold text-xl">{price}$</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="clamp-2 h-12 w-5/6">{description}</p>
          <div
            onClick={() => addToCart()}
            className="cursor-pointer bg-green rounded-full h-10 w-10 flex justify-center items-center"
          >
            <i className="fa-solid fa-cart-arrow-down text-white text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
