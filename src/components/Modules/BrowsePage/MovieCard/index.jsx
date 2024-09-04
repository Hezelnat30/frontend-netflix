import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  isFetchingAtom,
  isOpenModalAtom,
  tokenAtom,
} from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/api";
import { checkFavoriteMovies } from "@/utils/checkFavoriteMovies";
import { getVideoUrl } from "@/utils/getVideoUrl";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useState } from "react";
import { GoChevronDown, GoPlay, GoPlusCircle, GoTrash } from "react-icons/go";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import Notification from "../../Elements/Notification";
import Skeleton from "./Skeleton";

export default function MovieCard({ data, isHover, setIsHover, moviesType }) {
  const navigate = useNavigate();

  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isFetching] = useAtom(isFetchingAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);

  const [isSubmit, setIsSubmit] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [movieTypeState, setMovieTypeState] = useState(null);

  async function handleAddFavoriteMovie() {
    if (!emailStorage && !tokenStorage) return;
    try {
      setIsSubmit(true);
      const addMovie = await apiInstanceExpress.post("my-movies", {
        email: emailStorage,
        token: tokenStorage,
        data,
      });
      if (addMovie.status !== 201)
        return setNotifMessage(`Failed add ${data.title} to favorite`);
      setNotifMessage(`Success add ${data.title} to favorite`);
      setIsFavorited(true);

      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage("");
      }, 3500);
      console.log(addMovie);
    } catch (error) {
      setNotifMessage(`Sorry, ${error.message}`);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage("");
      }, 3500);
    }
  }

  async function handleRemoveFavoriteMovie() {
    if (!emailStorage && !tokenStorage) return;
    setIsSubmit(true);
    try {
      const removeMovie = await apiInstanceExpress.delete("my-movies", {
        data: {
          email: emailStorage,
          token: tokenStorage,
          movieID: data.id,
        },
      });
      if (removeMovie.status !== 204)
        return setNotifMessage(`Failed remove ${data.title} from favorite`);
      setNotifMessage(`Success remove ${data.title} from favorite`);
      setIsFavorited(false);

      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage("");
      }, 3500);
    } catch (error) {
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(`Sorry, ${error.message}`);
      }, 3500);
    }
  }

  if (isFetching) return <Skeleton />;

  return (
    <>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}
      {isHover && idMovie === data.id && moviesType === movieTypeState ? (
        <motion.div
          className="absolute top-3 left-0 shadow-xl transition-all w-full z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ReactPlayer
            url={`https://youtube.com/watch?v=${videoUrl}`}
            playing={true}
            loop={true}
            muted={true}
            width={"100%"}
            height={"180px"}
            controls={false}
          />
          <div className="h-auto p-2 bg-[#141414] flex flex-col gap-1.5 rounded-b-md">
            <section className="mt-1 flex justify-between">
              <div className="flex gap-2">
                <button onClick={() => navigate(`/watch/${videoUrl}`)}>
                  <GoPlay size={32} />
                </button>
                <button
                  onClick={
                    isFavorited
                      ? handleRemoveFavoriteMovie
                      : handleAddFavoriteMovie
                  }
                  className="hover:text-white transition-all"
                >
                  {isFavorited ? (
                    <GoTrash size={32} />
                  ) : (
                    <GoPlusCircle size={32} />
                  )}
                </button>
              </div>
              <div>
                <button
                  className="rounded-full p-[.2rem] border-2"
                  onClick={() => setIsOpenModal(true)}
                >
                  <GoChevronDown size={20} />
                </button>
              </div>
            </section>
            <section className="text-left">
              <h2 className="font-semibold">{data.title}</h2>
              <p className="text-green-400">Popularity: {data.popularity}</p>
            </section>
          </div>
        </motion.div>
      ) : (
        <img
          onMouseEnter={() => {
            setIsHover(true);
            setIdMovie(data.id);
            getVideoUrl({ movie_id: data.id }).then((result) =>
              setVideoUrl(result)
            );
            checkFavoriteMovies({
              emailStorage,
              tokenStorage,
              idMovie: data.id,
            }).then((result) => setIsFavorited(result));
            setMovieTypeState(moviesType);
          }}
          src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
          alt={data.title}
          className="w-full h-24 md:h-32 cursor-pointer object-cover rounded"
        />
      )}
    </>
  );
}
