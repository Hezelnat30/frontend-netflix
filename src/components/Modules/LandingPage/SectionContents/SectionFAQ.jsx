import InputMembership from "@/components/Modules/LandingPage/InputMembership";
import {
  FAQ_TITLE_EN,
  FAQ_TITLE_ID,
  LIST_FAQ_EN,
  LIST_FAQ_ID,
} from "@/constants/listFAQ";
import { languageAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useState } from "react";

export default function SectionFAQ() {
  const [language] = useAtom(languageAtom);
  const [openContentIndex, setOpenContentIndex] = useState(null);

  return (
    <div className="w-full py-16 px-6 sm:px-12 md:px-40 bg-black border-t-8 border-stone-800">
      <h2 className="text-[32px] md:text-5xl font-bold md:font-black mb-6 text-white text-center">
        {language == "en" ? FAQ_TITLE_EN : FAQ_TITLE_ID}
      </h2>
      <ul className="flex flex-col gap-2 pt-2 pb-9 text-white max-w-6xl mx-auto">
        <EachUtils
          of={language == "en" ? LIST_FAQ_EN : LIST_FAQ_ID}
          render={(item, i) => (
            <li key={i}>
              <div className="bg-[#2d2d2d] hover:bg-[#414141]">
                <button
                  className="flex py-[1.1rem] px-6 md:p-6 justify-between items-center w-full"
                  onClick={() =>
                    setOpenContentIndex(openContentIndex === i ? null : i)
                  }
                >
                  <span className="font-semibold text-[18px] text-start md:text-2xl">
                    {item.title}
                  </span>
                  <motion.div
                    animate={{ rotate: openContentIndex === i ? 135 : 0 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      role="img"
                      aria-hidden="true"
                      className="elj7tfr3 default-ltr-cache-1dpnjn e164gv2o4 w-6 md:w-full"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </motion.div>
                </button>
              </div>
              <motion.div
                initial={{ translateY: -10 }}
                animate={{ translateY: openContentIndex === i ? 0 : -20 }}
                exit={{ translateY: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="p-6 mt-[0.1rem] bg-[#2d2d2d]"
                style={{ display: openContentIndex === i ? "block" : "none" }}
              >
                {item.desc.split("\n").map((desc, i, arr) => (
                  <p
                    className={`text-[18px] md:text-2xl ${
                      i !== arr.length - 1 && "mb-8"
                    }`}
                    key={i}
                  >
                    {desc}
                  </p>
                ))}
              </motion.div>
            </li>
          )}
        />
      </ul>
      <div className="flex justify-center max-w-3xl mt-4 mx-auto text-center">
        <InputMembership />
      </div>
    </div>
  );
}
