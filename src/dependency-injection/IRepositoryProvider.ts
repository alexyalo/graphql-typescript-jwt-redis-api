import { IMovieRepository } from "../core/movie/domain/IMovieRepository";
import { IEpisodeRepository } from "../core/episode/domain/IEpisodeRepository";
import { ISeriesRepository } from "../core/series/domain/ISeriesRepository";

export interface IRepositoryProvider {
    getSeriesRepository(): ISeriesRepository;
    getEpisodeRepository(): IEpisodeRepository;
    getMovieRepository(): IMovieRepository;
}