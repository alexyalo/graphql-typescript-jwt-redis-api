import { MovieService } from "../domain/MovieService";
import { Movie } from "../domain/Movie";

export class MovieAPI {
  constructor(private movieService: MovieService){}

  getByTitle(title: string): Promise<Movie[]> {
    return this.movieService.search(title);
  }
}