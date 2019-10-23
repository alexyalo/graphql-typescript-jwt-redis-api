import { MovieAPI } from "../core/movie/usecase/MovieAPI";
import { EpisodeAPI } from "../core/episode/usecase/EpisodeAPI";
import { SeriesAPI } from "../core/series/usecase/SeriesAPI";

export interface IUseCaseProvider {
    getSeriesAPI(): SeriesAPI;
    getEpisodeAPI(): EpisodeAPI;
    getMovieAPI(): MovieAPI;
}