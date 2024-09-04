import Browse from "@/pages/Browse";
import Favorite from "@/pages/Favorite";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Watch from "@/pages/Watch";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/watch/:id",
    element: <Watch />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/favorite",
    element: <Favorite />,
  },
]);
