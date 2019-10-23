import { ICacheServiceProvider } from "./ICacheServiceProvider";
import { IMovieCacheService } from "../core/movie/domain/IMovieCacheService";
import { RedisMovieCacheService } from "../core/movie/infrastructure/RedisMovieCacheService";
import { IEpisodeCacheService } from "../core/episode/domain/IEpisodeCacheService";
import { RedisEpisodeCacheService } from "../core/episode/infrastructure/RedisEpisodeCacheService";
import { ISeriesCacheService } from "../core/series/domain/ISeriesCacheService";
import { RedisSeriesCacheService } from "../core/series/infrastructure/RedisSeriesCacheService";
import { Environment } from "../environment";

export class CacheServiceProvider implements ICacheServiceProvider {
    constructor(private environment: Environment) {}

    getSeriesCacheService(): ISeriesCacheService {
        return new RedisSeriesCacheService(this.environment.redisURL);
    }
    getEpisodeCacheService(): IEpisodeCacheService {
        return new RedisEpisodeCacheService(this.environment.redisURL);
    }
    getMovieCacheService(): IMovieCacheService {
        return new RedisMovieCacheService(this.environment.redisURL);
    }
}