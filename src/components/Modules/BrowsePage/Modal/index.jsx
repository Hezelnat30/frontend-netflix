import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  isOpenModalAtom,
  tokenAtom,
} from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/api";
import { getMovieDetail } from "@/utils/getMovieDetail";
import { getVideoUrl } from "@/utils/getVideoUrl";
import Recommendation from "@modules/BrowsePage/Modal/Recommendation";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GoPlusCircle, GoTrash } from "react-icons/go";
import { IoMdPlay } from "react-icons/io";
import { MdClose } from "react-icons/md";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import Notification from "../../Elements/Notification";

export default function Modal() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);

  const [movieDetail, setMovieDetail] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [notifMessage, setNotifMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  console.log(movieDetail);

  useEffect(() => {
    if (idMovie && isOpenModal) {
      getMovieDetail({ movie_id: idMovie }).then((result) =>
        setMovieDetail(result)
      );
      getVideoUrl({ movie_id: idMovie }).then((result) => setVideoUrl(result));
    }
  }, [idMovie, isOpenModal]);

  useEffect(() => {
    if (!isOpenModal) {
      setIdMovie(null);
      setMovieDetail([]);
      setVideoUrl(null);
    }
  }, [isOpenModal]);

  function genreMap(genres) {
    if (!genres) return null;
    return genres.map((genre) => genre.name).join(", ");
  }

  async function handleAddFavoriteMovie() {
    if (!emailStorage && !tokenStorage) return;
    try {
      setIsSubmit(true);
      const addMovie = await apiInstanceExpress.post("/my-movies", {
        email: emailStorage,
        token: tokenStorage,
        data: movieDetail,
      });

      if (addMovie.status !== 201)
        return setNotifMessage(`Failed add ${movieDetail.title} to favorite`);

      setNotifMessage(`Success add ${movieDetail.title} to favorite`);
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
      console.log(error);
    }
  }

  async function handleRemoveFavoriteMovie() {
    if (!emailStorage && !tokenStorage) return;
    setIsSubmit(true);
    try {
      const removeMovie = await apiInstanceExpress.delete("/my-movies", {
        data: {
          email: emailStorage,
          token: tokenStorage,
          movieID: movieDetail.id,
        },
      });
      if (removeMovie.status !== 204)
        return setNotifMessage(
          `Failed remove ${movieDetail.title} from favorite`
        );

      setNotifMessage(`Success remove ${movieDetail.title} from favorite`);
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

  return (
    <>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}
      <dialog className={`modal ${isOpenModal ? "modal-open" : ""}`}>
        <div className="modal-box p-0 w-full max-w-[850px] bg-[#181818]">
          <div className="relative">
            <div className="h-[475px] w-full">
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                playing={true}
                muted={true}
                loop={true}
                controls={false}
                url={`https://youtube.com/watch?v=${videoUrl}`}
              />
            </div>
            <button
              className="absolute top-3 right-3 bg-[#181818] rounded-full p-[.31rem] text-white"
              onClick={() => setIsOpenModal(false)}
            >
              <MdClose size={26} />
            </button>
            <div className="absolute bottom-24 left-10 text-white">
              <h2 className="font-black text-4xl">{movieDetail?.title}</h2>
            </div>
            <div className="absolute bottom-10 left-10">
              <div className="flex gap-2">
                <button
                  className="text-black bg-slate-50 flex items-center justify-center gap-1 py-1 pl-5 pr-7 rounded font-medium text-lg"
                  onClick={() => {
                    navigate(`/watch/${videoUrl}`);
                    setIsOpenModal(false);
                    setVideoUrl(null);
                    setIdMovie(null);
                  }}
                >
                  <IoMdPlay size={32} /> Putar
                </button>
                <button
                  className="text-slate-200 hover:text-white"
                  onClick={
                    isFavorited
                      ? handleRemoveFavoriteMovie
                      : handleAddFavoriteMovie
                  }
                >
                  {isFavorited ? (
                    <GoTrash size={44} />
                  ) : (
                    <GoPlusCircle size={44} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 px-12 py-2 text-white">
            <div>
              <div className="flex gap-2">
                <p>{movieDetail?.release_date}</p>
                <p>{movieDetail?.runtime}</p>
              </div>
              <p className="mt-4">{movieDetail?.overview}</p>
            </div>
            <div className="flex flex-col gap-4">
              <p>Genre: {genreMap(movieDetail?.genres)}</p>
              <p>Popularity: {movieDetail?.popularity}</p>
            </div>
          </div>
          <Recommendation />
        </div>
      </dialog>
    </>
  );
}
