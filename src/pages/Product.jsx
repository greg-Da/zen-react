import { useEffect, useState } from "react";

export default function Product() {
  const [data, setData] = useState({
    id: 1,
    title: "Product",
    price: 100,
    description: "This is a product",
    images: [
      "https://www.rover.com/blog/wp-content/uploads/2019/06/bernese-mountain-dog-1177074_1920.jpg",
      "https://www.thesprucepets.com/thmb/gJn01jw8irPdbq8MkGUZnBWrl7A=/3456x2304/filters:no_upscale():max_bytes(150000):strip_icc()/1.Carmelkaaustraliancattledog-829075922b564e19b096b55440538587.jpg",
      "https://www.thesprucepets.com/thmb/gJn01jw8irPdbq8MkGUZnBWrl7A=/3456x2304/filters:no_upscale():max_bytes(150000):strip_icc()/1.Carmelkaaustraliancattledog-829075922b564e19b096b55440538587.jpg",
      "https://www.thesprucepets.com/thmb/gJn01jw8irPdbq8MkGUZnBWrl7A=/3456x2304/filters:no_upscale():max_bytes(150000):strip_icc()/1.Carmelkaaustraliancattledog-829075922b564e19b096b55440538587.jpg",
      "https://www.thesprucepets.com/thmb/gJn01jw8irPdbq8MkGUZnBWrl7A=/3456x2304/filters:no_upscale():max_bytes(150000):strip_icc()/1.Carmelkaaustraliancattledog-829075922b564e19b096b55440538587.jpg",
    ],
  });
  const [selectedImage, setSelectedImage] = useState("https://www.rover.com/blog/wp-content/uploads/2019/06/bernese-mountain-dog-1177074_1920.jpg");

//   useEffect(() => {
//     fetch("")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         setSelectedImage(data.images[0]);
//       })
//       .catch((err) => console.log(err));
//   }, []);

  return (
    <div className="py-4 px-4 lg:px-64 w-full">
      <img src={selectedImage} alt={`Picture ${data.title}`} />

      <div className="mt-5 cursor-pointer grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {data.images.map((image, id) => (
          <img onClick={() => setSelectedImage(image)} key={id} src={image} className="" />
        ))}
      </div>

      <div className="flex justify-between mt-5">
            <p className="font-bold text-2xl">{data.title}</p>
            <p className="font-bold text-2xl">{data.price}$</p>
      </div>
      <p className="mt-5">{data.description}</p>

      <div className="flex justify-center">
        <button className="mt-5 bg-green py-1 px-3 rounded-full font-bold text-white text-2xl">Add to cart</button>
      </div>
    </div>
  );
}
