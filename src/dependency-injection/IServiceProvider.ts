import { MovieService } from "../core/movie/domain/MovieService";
import { EpisodeService } from "../core/episode/domain/EpisodeService";
import { SeriesService } from "../core/series/domain/SeriesService";

export interface IServiceProvider {
    getSeriesService(): SeriesService;
    getEpisodeService(): EpisodeService;
    getMovieService(): MovieService;
}