import OptionLanguage from "@/components/Modules/LandingPage/OptionLanguage";
import {
  FOOTER_CALL_EN,
  FOOTER_CALL_ID,
  LIST_FOOTER_EN,
  LIST_FOOTER_ID,
} from "@/constants/listFooter";
import { languageAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import { useAtom } from "jotai";

export default function Footer() {
  const [language] = useAtom(languageAtom);
  return (
    <footer className="w-full text-white/75 bg-black border-t-8 border-stone-800 py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <span>
          {language == "en" ? FOOTER_CALL_EN : FOOTER_CALL_ID}{" "}
          <a href="" className="underline">
            087-785-123-457
          </a>
        </span>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
          <EachUtils
            of={language == "en" ? LIST_FOOTER_EN : LIST_FOOTER_ID}
            render={(item, i) => (
              <li key={i} className="text-sm">
                <a href={item.url} className="underline">
                  {item.title}
                </a>
              </li>
            )}
          />
        </ul>
        <OptionLanguage />
        <p className="mt-4 text-sm">Netflix Indonesia</p>
      </div>
    </footer>
  );
}
