import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import {
  emailAtom,
  emailStorageAtom,
  languageAtom,
  tokenAtom,
} from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/api";
import { auth } from "@/utils/firebase";
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { useAtom } from "jotai";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Landing/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [, setToken] = useAtom(tokenAtom);
  const [, setEmailStorage] = useAtom(emailStorageAtom);
  const [language] = useAtom(languageAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const login = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await getIdToken(login.user, true);

      const addToken = await apiInstanceExpress.post("/my-token", {
        email,
        password,
        token: firebaseToken,
      });
      if (addToken.status !== 200) return toast("LOGIN FAILED");

      setToken(firebaseToken);
      setEmailStorage(login.user.email);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/browse");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/too-many-requests") {
        toast("TOO MANY REQUESTS, TRY AGAIN LATER");
      }
      if (error.code === "auth/invalid-credential") {
        toast("Your Email or Password is incorrect");
      }
    }
  }

  function handleShowPassword(e) {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  }

  return (
    <DefaultLayout>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        theme="dark"
      />
      <Navbar showMenu={false} />
      <div className="w-full mb-[11.5rem]">
        <img
          src={JUMBOTRON_IMAGE}
          alt="netflix-jumbotron"
          className="absolute w-full top-0 left-0 brightness-50"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black/70 p-16 rounded-md max-w-md w-full">
          <form action="" className="flex flex-col gap-3">
            <div className="relative text-white text-3xl font-bold mb-4 flex items-center justify-start gap-2">
              <GoChevronLeft
                size={36}
                className="absolute -left-10 cursor-pointer text-slate-200 hover:text-white"
                onClick={() => navigate("/")}
              />
              <h3>{language === "en" ? "Sign In" : "Masuk"}</h3>
            </div>
            <div className="relative">
              <input
                id="email"
                type="text"
                placeholder="Email"
                value={email ? email : ""}
                onChange={(e) => setEmail(e.target.value)}
                className="peer px-4 pb-1 md:pb-2 pt-5 md:pt-6 mb-2 md:mb-0 bg-transparent rounded border border-white/50 placeholder-transparent text-white backdrop-blur-sm w-full"
              />
              <label
                htmlFor="email"
                className="absolute text-xs text-slate-200/80 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-200/80 peer-placeholder-shown:top-5  md:peer-placeholder-shown:top-4 left-[49px] peer-focus:left-[49px] top-4 peer-focus:top-4 md:left-[1.1rem] md:peer-focus:left-[1.1rem] md:top-2 md:peer-focus:top-2 transition-all duration-200 ease-in-out peer-focus:text-xs  peer-focus:text-slate-200/80 "
              >
                Email or mobile number
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocus(true)}
                onBlur={() => setIsPasswordFocus(false)}
                placeholder="Password"
                className="peer px-4 pb-1 md:pb-2 pt-5 md:pt-6 mb-2 md:mb-0 bg-transparent rounded border border-white/50 placeholder-transparent text-white backdrop-blur-sm w-full"
              />
              <label
                htmlFor="password"
                className="absolute text-xs text-slate-200/80 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-200/80 peer-placeholder-shown:top-5  md:peer-placeholder-shown:top-4 left-[49px] peer-focus:left-[49px] top-4 peer-focus:top-4 md:left-[1.1rem] md:peer-focus:left-[1.1rem] md:top-2 md:peer-focus:top-2 transition-all duration-200 ease-in-out peer-focus:text-xs  peer-focus:text-slate-200/80"
              >
                Password
              </label>
              {isPasswordFocus &&
                (showPassword ? (
                  <div className="absolute text-white top-1/2 -translate-y-1/2 right-3 cursor-pointer hover:bg-stone-400/50 rounded-full p-2 transition-all ease-in-out duration-300">
                    <FaRegEye
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleShowPassword}
                      size={16}
                    />
                  </div>
                ) : (
                  <div className="absolute text-white top-1/2 -translate-y-1/2 right-3 cursor-pointer hover:bg-stone-400/50 rounded-full p-2 transition-all ease-in-out duration-300">
                    <FaRegEyeSlash
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleShowPassword}
                      size={16}
                    />
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-red-netflix py-2 text-white font-medium rounded disabled:bg-red-400 disabled:cursor-wait"
              >
                {isLoading
                  ? "Wait a moment..."
                  : language === "en"
                  ? "Sign In"
                  : "Masuk"}
              </button>
              <p>
                {language == "en" ? "New to Netflix?" : "Belum punya akun"}{" "}
                <a
                  onClick={() => navigate("/register")}
                  className="text-white hover:underline font-medium cursor-pointer"
                >
                  Sign up now.
                </a>
              </p>
            </div>
          </form>
        </div>
        ;
      </div>
    </DefaultLayout>
  );
}
