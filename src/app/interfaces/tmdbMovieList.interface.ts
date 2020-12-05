import { Movie } from './movie.interface';

export interface TMDBMovieList {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
  error?: object;
  ok?: boolean;
}
