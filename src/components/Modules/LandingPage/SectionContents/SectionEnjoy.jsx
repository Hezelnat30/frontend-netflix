import { ENJOY_TV_IMAGE, ENJOY_TV_VIDEO } from "@/constants/listAsset";
import { LIST_CONTENT_1_EN, LIST_CONTENT_1_ID } from "@/constants/listContent";
import { languageAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import SectionLayout from "@layouts/SectionLayout";
import { useAtom } from "jotai";

export default function SectionEnjoy() {
  const [language] = useAtom(languageAtom);
  return (
    <SectionLayout>
      <EachUtils
        of={language === "en" ? LIST_CONTENT_1_EN : LIST_CONTENT_1_ID}
        render={(item, i) => (
          <div
            key={i}
            className="text-white sm:px-10 md:px-6 text-center md:text-start mx-auto max-w-xs sm:max-w-xl"
          >
            <h2 className="font-bold md:font-black text-3xl sm:text-[32px] md:text-5xl text-white">
              {item.title}
            </h2>
            <p className="text-white text-lg sm:text-xl md:text-2xl mt-4 md:mt-6">
              {item.desc}
            </p>
          </div>
        )}
      />
      <div className="relative max-w-xl mx-auto">
        <img
          src={ENJOY_TV_IMAGE}
          alt="enjoy-tv"
          className="relative z-10 overflow-hidden"
        />
        <div className="absolute top-6 sm:top-[5.3rem]  left-1/2 -translate-x-1/2 w-[73%]">
          <video autoPlay muted loop>
            <source src={ENJOY_TV_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
    </SectionLayout>
  );
}
