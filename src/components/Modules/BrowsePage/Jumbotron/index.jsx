import { idMovieAtom, isOpenModalAtom, languageAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/utils/getMoviesByType";
import { getVideoUrl } from "@/utils/getVideoUrl";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import { IoMdInformationCircleOutline, IoMdPlay } from "react-icons/io";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

export default function Jumbotron() {
  const navigate = useNavigate();

  const [language] = useAtom(languageAtom);
  const [idMovie, setIdMovie] = useState(null);
  const [, setIdMovieAtom] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);

  const [isMute, setIsMute] = useState(true);
  const [topMovies, setTopMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    getMoviesByType({ moviesType: "top_rated" }).then((result) => {
      setTopMovies(result[0]);
      setIdMovie(result[0].id);
    });
  }, [setIdMovie]);

  useEffect(() => {
    if (idMovie) {
      getVideoUrl({ movie_id: idMovie }).then((result) => setVideoUrl(result));
    }
  }, [idMovie]);

  return (
    <div className="relative h-[600px] w-full">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoUrl}`}
        width={"100%"}
        height={"700px"}
        playing={true}
        muted={isMute}
        controls={false}
        style={{ opacity: 0.9 }}
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-10 p-8 max-w-md mx-auto">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-3xl sm:text-5xl font-black">{topMovies.title}</h1>
          <p className="hidden lg:block">{topMovies.overview}</p>
        </div>
        <div className="flex gap-4 mt-4 ">
          <button
            onClick={() => {
              navigate(`/watch/${videoUrl}`);
              setIsMute(true);
            }}
            className="bg-gray-100 px-6 py-1 rounded text-xl font-medium text-black flex items-center gap-0.5"
          >
            <IoMdPlay size={32} />
            {language == "en" ? "Play" : "Putar"}
          </button>
          <button
            onClick={() => {
              setIdMovieAtom(idMovie);
              setIsOpenModal(true);
            }}
            className="bg-[#6d6d6d]/55 py-1 ps-5 pe-7 rounded text-white flex items-center gap-2 font-medium"
          >
            <IoMdInformationCircleOutline size={32} />
            {language == "en" ? "More Info" : "Selengkapnya"}
          </button>
        </div>
      </div>
      <div className="absolute bottom-1/2 -translate-y-1/2 right-10">
        <div
          className="border rounded-full p-2 cursor-pointer text-white"
          onClick={() => setIsMute((prev) => !prev)}
        >
          {isMute ? <GoMute size={21} /> : <GoUnmute size={21} />}
        </div>
      </div>
    </div>
  );
}
