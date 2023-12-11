import { useRef } from "react";

export default function FileInput({ uploadFile }) {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="w-fit flex justify-center items-center">
      <div className="w-32 h-32 rounded-md bg-gray-300 hover:bg-gray-400 transition-all duration-300 ease-in-out cursor-pointer flex justify-center items-center" onClick={handleClick}><i className="fa-solid fa-plus text-gray-600 text-4xl"></i></div>
      <input
        ref={hiddenFileInput}
        accept=".jpg, .jpeg, .png, .webp"
        type="file"
        className="hidden"
        onChange={uploadFile}
      />
    </div>
  );
}
