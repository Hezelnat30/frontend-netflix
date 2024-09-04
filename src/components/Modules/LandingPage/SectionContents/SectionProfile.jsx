import { PROFILE_KIDS_IMAGE } from "@/constants/listAsset";
import { LIST_CONTENT_4_EN, LIST_CONTENT_4_ID } from "@/constants/listContent";
import { languageAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import SectionLayout from "@layouts/SectionLayout";
import { useAtom } from "jotai";

export default function SectionProfile() {
  const [language] = useAtom(languageAtom);
  return (
    <SectionLayout styles=" sm:px-40">
      <div className="max-w-xl mx-auto order-2 md:order-1">
        <img src={PROFILE_KIDS_IMAGE} alt="profile-kids" />
      </div>
      <EachUtils
        of={language == "en" ? LIST_CONTENT_4_EN : LIST_CONTENT_4_ID}
        render={(item, i) => (
          <div
            key={i}
            className="text-white order-1 md:order-2 text-center md:text-start max-w-xs md:max-w-full mx-auto"
          >
            <h2 className="font-bold md:font-black text-3xl sm:text-4xl md:text-5xl text-white">
              {item.title}
            </h2>
            <p className="text-white text-lg sm:text-xl md:text-2xl mt-4 md:mt-6 md:max-w-lg">
              {item.desc}
            </p>
          </div>
        )}
      />
    </SectionLayout>
  );
}
