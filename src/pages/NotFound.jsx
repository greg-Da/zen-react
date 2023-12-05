import { useRef } from "react";

export default function NotFound() {
  const ref = useRef(null);

  function parallax(event) {
    const x = (window.innerWidth - event.pageX * 2.5) / 90;
    const y = (window.innerHeight - event.pageY * 2.5) / 90;

    ref.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
  }

  return (
    <div onMouseMove={(e) => parallax(e)} className="w-full flex flex-col items-center justify-center">
      <div className="text-[10em] lg:text-[20em] relative w-full flex justify-center items-center">
        <p>404</p>
        <p id="parallax" ref={ref} className="text-gray-400 absolute">
          404
        </p>
      </div>
      <p className="text-3xl font-bold">Are you lost ?</p>
    </div>
  );
}
