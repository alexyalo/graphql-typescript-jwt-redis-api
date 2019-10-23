import { IServiceProvider } from "./IServiceProvider";
import { ICacheServiceProvider } from "./ICacheServiceProvider";
import { IRepositoryProvider } from "./IRepositoryProvider";
import { MovieService } from "../core/movie/domain/MovieService";
import { EpisodeService } from "../core/episode/domain/EpisodeService";
import { SeriesService } from "../core/series/domain/SeriesService";

export class ServiceProvider implements IServiceProvider {

    constructor(private repositoryProvider: IRepositoryProvider,
        private cacheServiceProvider: ICacheServiceProvider) { }

    getSeriesService(): SeriesService {
        return new SeriesService(this.repositoryProvider.getSeriesRepository(),
            this.cacheServiceProvider.getSeriesCacheService());
    }

    getEpisodeService(): EpisodeService {
        return new EpisodeService(this.repositoryProvider.getEpisodeRepository(),
            this.cacheServiceProvider.getEpisodeCacheService());
    }
    getMovieService(): MovieService {
        return new MovieService(this.repositoryProvider.getMovieRepository(),
            this.cacheServiceProvider.getMovieCacheService());
    }
}