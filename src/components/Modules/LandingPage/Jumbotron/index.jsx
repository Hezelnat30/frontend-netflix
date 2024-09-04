import InputMembership from "@/components/Modules/LandingPage/InputMembership";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import {
  LIST_JUMBOTRON_EN,
  LIST_JUMBOTRON_ID,
} from "@/constants/listJumbotron";
import { languageAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import { useAtom } from "jotai";

export default function Jumbotron() {
  const [language] = useAtom(languageAtom);
  return (
    <div className="bg-black/0 w-full mb-[11.5rem]">
      <img
        src={JUMBOTRON_IMAGE}
        alt="netflix-jumbotron"
        className="absolute w-full top-0 left-0 object-cover h-[700px] mix-blend-overlay"
      />
      <EachUtils
        of={language === "en" ? LIST_JUMBOTRON_EN : LIST_JUMBOTRON_ID}
        render={(item, i) => (
          <div
            className="flex justify-center flex-col items-center mt-20 sm:mt-48 gap-6 text-center px-4 bg-transparent"
            key={i}
          >
            <h1 className="font-extrabold md:font-black text-[32px] lg:text-5xl text-white">
              {item.title}
            </h1>
            <p className="text-white text-[18px] lg:text-2xl">{item.desc}</p>
            <InputMembership />
          </div>
        )}
      />
    </div>
  );
}
