import { MovieService } from "../domain/MovieService";
import { Movie } from "../domain/Movie";
import { MovieSearchResult } from "../domain/MovieSearchResult";

export class MovieAPI {
  constructor(private movieService: MovieService){}

  getByTitle(title: string, page: number): Promise<MovieSearchResult> {
    return this.movieService.search(title, page);
  }
}