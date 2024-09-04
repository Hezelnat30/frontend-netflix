import { apiInstance } from "./api";
export const getMovieDetail = async ({ movie_id }) => {
  try {
    let movie = await apiInstance.get("movie/" + movie_id);
    return movie.data;
  } catch (error) {
    console.log({ error });
  }
};
