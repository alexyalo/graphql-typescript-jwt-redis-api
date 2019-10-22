import { IMovieCacheService } from "../core/movie/domain/IMovieCacheService";

export interface ICacheServiceProvider {
    getMovieCacheService(): IMovieCacheService;
}