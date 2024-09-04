import { useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
export default function CarouselLayout({ children }) {
  const ref = useRef(null);
  function scroll(offset) {
    ref.current.scrollLeft += offset;
  }
  return (
    <div className="relative mt-6">
      <div className="flex justify-between absolute left-0 w-full h-full">
        <button
          onClick={() => scroll(-500)}
          className="z-10 text-white hover:bg-blue-900/50 text-center opacity-75 transition-all ease-in-out duration-500 h-32 w-10"
        >
          <GoChevronLeft size={32} />
        </button>
        <button
          onClick={() => scroll(500)}
          className="z-10 text-white hover:bg-blue-900/50 text-center opacity-75 transition-all ease-in-out duration-500 h-32 w-10"
        >
          <GoChevronRight size={32} />
        </button>
      </div>
      <div ref={ref} className="carousel relative scroll-smooth space-x-2">
        {children}
      </div>
    </div>
  );
}
