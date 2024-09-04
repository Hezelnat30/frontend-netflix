import { WATCH_DEVICE_IMAGE, WATCH_DEVICE_VIDEO } from "@/constants/listAsset";
import { LIST_CONTENT_3_EN, LIST_CONTENT_3_ID } from "@/constants/listContent";
import { languageAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import SectionLayout from "@layouts/SectionLayout";
import { useAtom } from "jotai";

export default function SectionWatch() {
  const [language] = useAtom(languageAtom);
  return (
    <SectionLayout>
      <EachUtils
        of={language == "en" ? LIST_CONTENT_3_EN : LIST_CONTENT_3_ID}
        render={(item, i) => (
          <div
            key={i}
            className="text-white text-center md:text-start mx-auto max-w-sm sm:max-w-full md:ms-12 px-6 sm:px-10 md:px-0"
          >
            <h2 className="font-bold md:font-black text-3xl sm:text-[32px] md:text-5xl text-white">
              {item.title}
            </h2>
            <p
              className={`text-white text-lg sm:text-xl md:text-2xl mt-4 md:mt-6`}
            >
              {item.desc}
            </p>
          </div>
        )}
      />
      <div className="relative mx-auto max-w-[34rem] md:me-12">
        <img
          src={WATCH_DEVICE_IMAGE}
          alt="watch-device"
          className="relative z-10"
        />
        <div className="absolute top-10 w-[65%] left-1/2 -translate-x-1/2">
          <video autoPlay muted loop>
            <source src={WATCH_DEVICE_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
    </SectionLayout>
  );
}
