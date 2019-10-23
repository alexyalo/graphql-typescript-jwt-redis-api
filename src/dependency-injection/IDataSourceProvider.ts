import { MovieDataSource } from "../delivery/movies/MovieDataSource";
import { EpisodeDataSource } from "../delivery/episodes/EpisodeDataSource";
import { SeriesDataSource } from "../delivery/series/SeriesDataSource";

export interface IDataSourceProvider {
    getSeriesDataSource(): SeriesDataSource;
    getEpisodeDataSource(): EpisodeDataSource;
    getMovieDataSource(): MovieDataSource;
}