import { idMovieAtom, isFetchingAtom, searchMoviesAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import { searchMovies } from "@/utils/searchMovies";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";

export default function SearchMovies() {
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [searchQuery] = useAtom(searchMoviesAtom);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  const [movieList, setMovieList] = useState([]);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      searchMovies({ query: searchQuery })
        .then((result) => {
          setIsFetching(true);
          setMovieList(result);
        })
        .finally(() => {
          setTimeout(() => {
            setIsFetching(false);
          }, 750);
        });
    }
  }, [searchQuery]);

  return (
    <div className="grid grid-rows-[auto_1fr] px-14 py-24 gap-6 min-h-screen">
      <h1 className="text-base md:text-lg text-[#808080]">
        Hasil untuk '{searchQuery}'
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0.5 md:gap-1 lg:gap-1.5">
        <EachUtils
          of={movieList}
          render={(item, i) => (
            <div
              className="mb-12 relative"
              key={i}
              onMouseLeave={() => {
                setIsHover(false);
                setIdMovie(null);
              }}
            >
              <MovieCard
                data={item}
                isHover={isHover}
                setIsHover={setIsHover}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
