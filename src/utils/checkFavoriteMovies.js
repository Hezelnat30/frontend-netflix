import { apiInstanceExpress } from "@/utils/api";

export async function checkFavoriteMovies({
  emailStorage,
  tokenStorage,
  idMovie,
}) {
  try {
    const isFavorited = await apiInstanceExpress.post("my-movies/check", {
      email: emailStorage,
      token: tokenStorage,
      movieID: idMovie,
    });
    if (isFavorited.status === 200) {
      const result = isFavorited.data.data.isFavorited;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
