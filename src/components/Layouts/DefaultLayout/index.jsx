import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { auth } from "@/utils/firebase";
import Loading from "@modules/Elements/Loading";
import { useAtom } from "jotai";
import { useAuthState } from "react-firebase-hooks/auth";

export default function DefaultLayout({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);

  if (loading) return <Loading />;
  if (error) return <p>Error</p>;
  if (user && emailStorage && tokenStorage) return location.replace("/browse");
  return <div>{children}</div>;
}
