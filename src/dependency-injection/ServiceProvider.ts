import { IServiceProvider } from "./IServiceProvider";
import { ICacheServiceProvider } from "./ICacheServiceProvider";
import { IRepositoryProvider } from "./IRepositoryProvider";
import { MovieService } from "../core/movie/domain/MovieService";

export class ServiceProvider implements IServiceProvider {
    constructor(private repositoryProvider: IRepositoryProvider, 
                private cacheServiceProvider: ICacheServiceProvider){}

    getMovieService(): MovieService {
        return new MovieService(this.repositoryProvider.getMovieRepository(), 
                                this.cacheServiceProvider.getMovieCacheService());
    }
}