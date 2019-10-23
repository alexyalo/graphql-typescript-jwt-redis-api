import { IMovieCacheService } from "../core/movie/domain/IMovieCacheService";
import { IEpisodeCacheService } from "../core/episode/domain/IEpisodeCacheService";
import { ISeriesCacheService } from "../core/series/domain/ISeriesCacheService";

export interface ICacheServiceProvider {
    getSeriesCacheService(): ISeriesCacheService;
    getEpisodeCacheService(): IEpisodeCacheService;
    getMovieCacheService(): IMovieCacheService;
}