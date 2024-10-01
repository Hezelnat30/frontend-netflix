import BrowseLayout from "@/components/Layouts/BrowseLayout";
import Modal from "@/components/Modules/BrowsePage/Modal";
import MovieCard from "@/components/Modules/BrowsePage/MovieCard";
import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  tokenAtom,
} from "@/jotai/atoms";
import { apiInstanceExpress } from "@/utils/api";
import EachUtils from "@/utils/EachUtils";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function Favorite() {
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [isFavorited] = useAtom(isFavoritedAtom);

  const [isHover, setIsHover] = useState(false);
  const [movieList, setMovieList] = useState([]);
  async function getFavoriteMovies() {
    try {
      const url = `/my-movies/${emailStorage}/${tokenStorage}`;
      const res = await apiInstanceExpress.get(url);
      if (res.status === 200) return res.data.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  useEffect(() => {
    if (emailStorage && tokenStorage) {
      getFavoriteMovies().then((result) => setMovieList(result.favoriteMovies));
    }
  }, [emailStorage, tokenStorage, isFavorited]);

  return (
    <BrowseLayout>
      <div className="mt-16 py-2 px-14">
        <h3 className="text-white font-medium text-2xl">My Favorite Movies</h3>
        {movieList.length === 0 && (
          <p className="text-white">No Favorite Movies, add some</p>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0.5 md:gap-1 lg:gap-1.5 px-14 mt-14">
        <EachUtils
          of={movieList}
          render={(item, i) => (
            <div
              className="relative"
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
      <Modal />
    </BrowseLayout>
  );
}
