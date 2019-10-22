import { ICacheServiceProvider } from "./ICacheServiceProvider";
import { IMovieCacheService } from "../core/movie/domain/IMovieCacheService";
import { RedisMovieCacheService } from "../core/movie/infrastructure/RedisMovieCacheService";

export class CacheServiceProvider implements ICacheServiceProvider {
    getMovieCacheService(): IMovieCacheService {
        return new RedisMovieCacheService();
    }
}