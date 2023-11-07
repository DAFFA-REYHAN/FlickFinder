import axios from "axios"

const movieBaseUrl = "https://api.themoviedb.org/3"
const api_key = "487683bedcaa323080ef5402dd737be5"

const movieByGenreBaseUrl =
  "https://api.themoviedb.org/3/discover/movie?api_key=487683bedcaa323080ef5402dd737be5"

//https://api.themoviedb.org/3/movie/550?api_key=487683bedcaa323080ef5402dd737be5
const getTrendingVideos = axios.get(
  movieBaseUrl + "/trending/all/day?api_key=" + api_key
)
const getMovieByGenreId = (id) =>
  axios.get(movieByGenreBaseUrl + "&with_genres=" + id)
export default {
  getTrendingVideos,
  getMovieByGenreId,
}
