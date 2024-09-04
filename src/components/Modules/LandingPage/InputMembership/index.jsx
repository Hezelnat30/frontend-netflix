import DefaultButton from "@/components/Modules/LandingPage/DefaultButton";
import { LIST_CTA_EN, LIST_CTA_ID } from "@/constants/listCTA";
import { emailAtom, languageAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function InputMembership() {
  const navigate = useNavigate();
  const [language] = useAtom(languageAtom);
  const [, setEmail] = useAtom(emailAtom);

  function handleEmail(e) {
    e.preventDefault();
    navigate("/register");
  }

  return (
    <form>
      <EachUtils
        of={language == "en" ? LIST_CTA_EN : LIST_CTA_ID}
        render={(item, i) => (
          <div key={i}>
            <h3 className="text-white text-[18px] md:text-xl">{item.title}</h3>
            <div className="relative flex flex-col sm:flex-row justify-center items-center gap-2 py-2 px-8 sm:px-0 mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder={item.labelInput}
                className="peer px-4 pb-1 md:pb-2 pt-5 md:pt-6 mb-2 md:mb-0 bg-transparent w-full sm:w-3/5 rounded border border-white/50 placeholder-transparent text-white backdrop-blur-sm"
              />
              <label
                htmlFor="email"
                className={`absolute ${
                  language == "en"
                    ? "left-[49px] peer-focus:left-[49px] top-4 peer-focus:top-4 md:left-[33px] md:peer-focus:left-[33px] md:top-[18px] md:peer-focus:top-[18px]"
                    : "left-[3.1rem] peer-focus:left-[3.1rem] top-[14px] peer-focus:top-[14px] md:left-[93px] md:peer-focus:left-[93px] md:top-5 md:peer-focus:top-5"
                } text-xs text-slate-200/80 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-200/80 peer-placeholder-shown:top-5  md:peer-placeholder-shown:top-6 transition-all duration-200 ease-in-out peer-focus:text-xs  peer-focus:text-slate-200/80
        `}
              >
                {item.labelInput}
              </label>
              <DefaultButton
                onClick={handleEmail}
                text={item.buttonSubmit}
                isArrowIcon={true}
                styles={
                  "flex pt-3 pb-2 px-3 sm:py-3 sm:px-6 justify-center items-center text-lg sm:text-2xl font-medium gap-2 md:gap-3 border border-red-netflix"
                }
              />
            </div>
          </div>
        )}
      />
    </form>
  );
}
