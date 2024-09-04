import AccountMenu from "@/components/Modules/BrowsePage/AccountMenu";
import { LIST_NAVBAR_EN, LIST_NAVBAR_ID } from "@/constants/listNavbar";
import { languageAtom, searchMoviesAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import InputSearchMovies from "@modules/BrowsePage/InputSearchMovies";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [language] = useAtom(languageAtom);
  const [, setSearchQuery] = useAtom(searchMoviesAtom);
  return (
    <header>
      <nav className="bg-[#141414] fixed text-white top-0 left-0 px-14 py-4 w-full z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <img
              onClick={() => {
                setSearchQuery(null);
                navigate("/browse");
              }}
              src="/netflix-logo-png.png"
              alt="netflix"
              className="w-[6.2rem] cursor-pointer hover:scale-105 transition-all"
            />
            <ul className="hidden sm:flex items-center gap-5">
              <EachUtils
                of={language === "en" ? LIST_NAVBAR_EN : LIST_NAVBAR_ID}
                render={(item, i) => (
                  <li key={i} className="text-sm">
                    <a href={item.url}>{item.title}</a>
                  </li>
                )}
              />
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <InputSearchMovies />
            <AccountMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
