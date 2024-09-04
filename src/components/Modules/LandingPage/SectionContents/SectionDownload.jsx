import {
  DOWNLOAD_COVER_IMAGE,
  DOWNLOAD_PHONE_IMAGE,
} from "@/constants/listAsset";
import { LIST_CONTENT_2_EN, LIST_CONTENT_2_ID } from "@/constants/listContent";
import { languageAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import SectionLayout from "@layouts/SectionLayout";
import { useAtom } from "jotai";

export default function SectionDownload() {
  const [language] = useAtom(languageAtom);
  return (
    <SectionLayout>
      <div className="max-w-2xl mx-auto relative order-2 md:order-1">
        <img
          src={DOWNLOAD_PHONE_IMAGE}
          alt="phone"
          className="sm:max-w-2xl md:max-w-[34rem]"
        />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black border-gray-300/50 border-2 flex items-center rounded-xl py-2 sm:py-1.5 px-3 w-[65%] md:w-[56%] gap-4 mx-auto">
          <img
            src={DOWNLOAD_COVER_IMAGE}
            alt="cover"
            className="max-h-11 sm:max-h-16 md:max-h-20"
          />
          <div className="flex flex-col m-0 text-left">
            <p className="text-sm sm:text-base font-bold text-white">
              Stranger Things
            </p>
            <p className="text-xs sm:text-base text-blue-500 font-light">
              Downloading...
            </p>
          </div>
        </div>
      </div>
      <EachUtils
        of={language == "en" ? LIST_CONTENT_2_EN : LIST_CONTENT_2_ID}
        render={(item, i) => (
          <div
            key={i}
            className="text-white sm:px-10 md:px-0 md:pe-1 order-1 md:order-2 text-center md:text-start mx-auto max-w-xs sm:max-w-full"
          >
            <h2 className="font-bold md:font-black text-3xl sm:text-[32px] md:text-5xl text-white md:max-w-xl">
              {item.title}
            </h2>
            <p
              className={`text-white text-lg sm:text-xl md:text-2xl mt-4 md:mt-6 ${
                language == "en" ? "md:pr-10" : " md:pe-4"
              }`}
            >
              {item.desc}
            </p>
          </div>
        )}
      />
    </SectionLayout>
  );
}
