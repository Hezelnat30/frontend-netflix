import Loading from "@/components/Modules/Elements/Loading";
import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import Navbar from "@/pages/Browse/Navbar";
import { auth } from "@/utils/firebase";
import { useAtom } from "jotai";
import { useAuthState } from "react-firebase-hooks/auth";

export default function BrowseLayout({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);

  if (loading) return <Loading />;

  if (error) return <p>Error</p>;

  if (!user && !emailStorage && !tokenStorage) return location.replace("/");

  return (
    <div className="bg-[#141414] min-h-screen">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
