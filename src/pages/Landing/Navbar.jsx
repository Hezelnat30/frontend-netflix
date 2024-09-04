import DefaultButton from "@/components/Modules/LandingPage/DefaultButton";
import OptionLanguage from "@/components/Modules/LandingPage/OptionLanguage";
import { useNavigate } from "react-router-dom";

export default function Navbar({ showMenu = true }) {
  const navigate = useNavigate();
  return (
    <header className="py-5 px-6 md:px-40 relative z-20">
      <nav className="flex justify-between items-center text-white">
        <div
          onClick={() => (!showMenu ? navigate("/") : null)}
          className={`${!showMenu ? "cursor-pointer" : ""}`}
        >
          <img
            src="/netflix-logo-png.png"
            alt="netflix"
            className="w-[120px] sm:w-[155px]"
            height={40}
          />
        </div>
        {showMenu && (
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <OptionLanguage styles="backdrop-blur-sm" />
            <DefaultButton
              text={"Sign In"}
              styles={"font-medium text-sm py-1.5"}
              onClick={() => navigate("/login")}
            />
          </div>
        )}
      </nav>
    </header>
  );
}
