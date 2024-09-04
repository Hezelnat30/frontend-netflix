import SearchMovies from "@/components/Modules/BrowsePage/SearchMovies";
import Footer from "@/components/Modules/LandingPage/Footer";
import { searchMoviesAtom } from "@/jotai/atoms";
import BrowseLayout from "@layouts/BrowseLayout";
import Jumbotron from "@modules/BrowsePage/Jumbotron";
import Modal from "@modules/BrowsePage/Modal";
import MovieList from "@modules/BrowsePage/MovieList";
import { useAtom } from "jotai";

export default function Browse() {
  const [searchQuery] = useAtom(searchMoviesAtom);
  return (
    <BrowseLayout>
      {searchQuery ? (
        <SearchMovies />
      ) : (
        <>
          <Jumbotron />
          <MovieList title={"Now Playing"} moviesType={"now_playing"} />
          <MovieList title={"Popular Movies"} moviesType={"popular"} />
          <MovieList title={"Top Rated Movies"} moviesType={"top_rated"} />
          <MovieList title={"Upcoming"} moviesType={"upcoming"} />
        </>
      )}
      <Footer />
      <Modal />
    </BrowseLayout>
  );
}
