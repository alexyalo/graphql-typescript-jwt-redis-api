import { ICacheServiceProvider } from "../../src/dependency-injection/ICacheServiceProvider";
import { ISeriesCacheService } from "../../src/core/series/domain/ISeriesCacheService";
import { IEpisodeCacheService } from "../../src/core/episode/domain/IEpisodeCacheService";
import { IMovieCacheService } from "../../src/core/movie/domain/IMovieCacheService";
import { TestSeriesCacheService } from "../series/TestSeriesCacheService";
import { TestEpisodeCacheService } from "../episode/TestEpisodeCacheService";
import { TestMovieCacheService } from "../movie/TestMovieCacheService";

export class TestCacheServiceProvider implements ICacheServiceProvider {
    getSeriesCacheService(): ISeriesCacheService {
        return new TestSeriesCacheService();
    }    
    
    getEpisodeCacheService(): IEpisodeCacheService {
        return new TestEpisodeCacheService();
    }
    
    getMovieCacheService(): IMovieCacheService {
        return new TestMovieCacheService();
    }
}