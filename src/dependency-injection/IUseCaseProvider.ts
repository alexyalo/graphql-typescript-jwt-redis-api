import { MovieAPI } from "../core/movie/usecase/MovieAPI";

export interface IUseCaseProvider {
    getMovieAPI(): MovieAPI;
}