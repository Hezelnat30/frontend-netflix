import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import { getMoviesRecommendation } from "@/utils/getMoviesRecommendation";
import { getVideoUrl } from "@/utils/getVideoUrl";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IoIosPlay } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Recommendation() {
  const navigate = useNavigate();

  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [moviesRecommendation, setMoviesRecommendation] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  useEffect(() => {
    idMovie &&
      getMoviesRecommendation({ movie_id: idMovie }).then((result) => {
        setMoviesRecommendation(result);
      });
  }, [idMovie]);

  function sliceOverview(overview, maxLength) {
    if (overview.length > maxLength) {
      return overview.slice(0, maxLength) + " ...";
    }
    return overview;
  }

  return (
    <div className="px-12 py-8">
      <h2 className="text-2xl font-bold mt-4 text-white">
        Movies Recommendation
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-4">
        <EachUtils
          of={moviesRecommendation}
          render={(item, i) => (
            <div
              key={i}
              className="w-full h-auto cursor-pointer rounded-md bg-[#2f2f2f]"
              onMouseEnter={() => {
                getVideoUrl({ movie_id: item.id }).then((result) =>
                  setVideoUrl(result)
                );
              }}
            >
              <div
                className="relative group"
                onClick={() => {
                  navigate(`/watch/${videoUrl}`);
                  setIsOpenModal(false);
                  setIdMovie(null);
                }}
              >
                <img
                  src={
                    import.meta.env.VITE_BASE_URL_TMDB_IMAGE + item.poster_path
                  }
                  alt={item.title}
                  className="w-full h-36 rounded-t-md object-cover"
                />
                <button className="absolute top-10 left-1/2 -translate-x-1/2 text-white bg-black/35 opacity-0 group-hover:opacity-100 transition-all duration-300 p-1 border-1.5 border-white rounded-full flex items-center justify-center">
                  <IoIosPlay size={40} />
                </button>
              </div>

              <div className="p-4">
                <div className="flex gap-2">
                  <p>{item.release_date}</p>
                  <p className="text-green-400/90">{item.vote_average}</p>
                </div>
                <p className="pt-2 h-36 text-sm text-[#d2d2d2] text-ellipsis">
                  {sliceOverview(item.overview, 180)}
                </p>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
