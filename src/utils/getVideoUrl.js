import { apiInstance } from "./api";

export const getVideoUrl = async ({ movie_id }) => {
  const url = await apiInstance.get(`movie/${movie_id}/videos`);
  const result = url.data.results;

  if (result && result.length > 0) {
    return result[0].key;
  } else {
    return null;
  }
};
