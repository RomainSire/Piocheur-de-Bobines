import { movie } from "./movie.interface";

export interface TMDBMovieList {
  page: number,
  results: [movie],
  total_pages: number,
  total_results: number,
  error?: object
}