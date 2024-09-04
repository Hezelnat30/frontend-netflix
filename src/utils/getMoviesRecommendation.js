import { apiInstance } from "@/utils/api";

export const getMoviesRecommendation = async ({ movie_id }) => {
  try {
    const movies = await apiInstance.get(`movie/${movie_id}/recommendations`);
    return movies.data.results;
  } catch (error) {
    console.log({ error: error.message });
  }
};
