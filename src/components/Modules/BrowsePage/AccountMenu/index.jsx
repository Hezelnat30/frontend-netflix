import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/api";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const navigate = useNavigate();
  const [token, setToken] = useAtom(tokenAtom);
  const [email, setEmailStorage] = useAtom(emailStorageAtom);

  async function handleSignOut() {
    const data = { email, token };
    const dbSignOut = await apiInstanceExpress.delete("my-token", { data });

    if (dbSignOut.status === 204) {
      signOut(auth).then(async () => {
        setToken(null);
        setEmailStorage(null);
        navigate("/");
      });
    }
    console.log("berhasil signout");
  }

  return (
    <div className="flex relative dropdown dropdown-hover dropdown-end">
      <div className="avatar" tabIndex={0}>
        <div className="w-8 rounded">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="dropdown-content absolute top-10 py-2 px-4 z-20 bg-black/90 text-white rounded flex flex-col gap-2 divide-y-1.5">
        <p>{email}</p>
        <button
          tabIndex={0}
          className="w-full cursor-pointer hover:underline"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
