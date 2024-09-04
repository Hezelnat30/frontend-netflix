import { idMovieAtom, isFetchingAtom } from "@/jotai/atoms";
import EachUtils from "@/utils/EachUtils";
import { getMoviesByType } from "@/utils/getMoviesByType";
import CarouselLayout from "@layouts/CarouselLayout";
import MovieCard from "@modules/BrowsePage/MovieCard";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function MovieList({ title, moviesType }) {
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  const [isHover, setIsHover] = useState(false);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    getMoviesByType({ moviesType })
      .then((result) => {
        setIsFetching(true);
        setMovieList(result);
      })
      .finally(() => {
        setTimeout(() => {
          setIsFetching(false);
        }, 500);
      });
  }, [moviesType]);

  return (
    <section className="px-8 py-4 relative">
      <h3 className="font-bold text-3xl mb-2 text-white">{title}</h3>
      <CarouselLayout>
        <EachUtils
          of={movieList}
          render={(item, i) => (
            <div
              className="carousel-item relative w-1/2 sm:w-1/3 md:w-1/6 h-96"
              key={i}
              onMouseLeave={() => {
                setIsHover(false);
                setIdMovie(null);
              }}
            >
              <MovieCard
                moviesType={moviesType}
                data={item}
                isHover={isHover}
                setIsHover={setIsHover}
              />
            </div>
          )}
        />
      </CarouselLayout>
    </section>
  );
}
