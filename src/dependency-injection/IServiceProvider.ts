import { MovieService } from "../core/movie/domain/MovieService";

export interface IServiceProvider {
    getMovieService(): MovieService;
}