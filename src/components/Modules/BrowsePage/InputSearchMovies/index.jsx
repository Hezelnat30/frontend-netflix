import { languageAtom, searchMoviesAtom } from "@/jotai/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function InputSearchMovies() {
  const [isShow, setIsShow] = useState(false);
  const [language] = useAtom(languageAtom);
  const [searchMovies, setSearchMovies] = useAtom(searchMoviesAtom);

  function handleInputChange(e) {
    const input = e.target.value;
    if (input.length >= 3) {
      setSearchMovies(input);
    } else {
      setSearchMovies(null);
    }
  }

  function handleSearchIcon() {
    (isShow || setSearchMovies) && setIsShow((prev) => !prev);
  }

  return (
    <div className="relative flex items-center">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isShow ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center w-full border border-white overflow-hidden"
        style={{ transformOrigin: "right" }}
      >
        <motion.input
          initial={{ width: 0 }}
          animate={{ width: isShow ? "17rem" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          type="text"
          className="bg-black outline-none py-[.3rem] pl-11 pr-4"
          placeholder={
            language === "en" ? "title, people, genres" : "Judul, orang, genre"
          }
          onChange={handleInputChange}
        />
      </motion.div>
      <motion.div
        initial={{ translateX: 0 }}
        animate={{ translateX: isShow ? -241 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`absolute right-0 ${
          isShow ? "cursor-default" : "cursor-pointer"
        }`}
        onClick={handleSearchIcon}
      >
        <IoSearchOutline size={27} />
      </motion.div>
    </div>
  );
}
