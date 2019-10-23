import { Movie } from "./Movie";
import { IMovieRepository } from "./IMovieRepository";
import { IMovieCacheService } from "./IMovieCacheService";
import { MovieSearchResult } from "./MovieSearchResult";

export class MovieService {
    constructor(private movieRepository: IMovieRepository, private cacheService: IMovieCacheService) { }

    public async search(title: string, page: number): Promise<MovieSearchResult> {
        let cachedResult = await this.cacheService.getByKey(title, page);
        
        if (cachedResult) {
            return cachedResult;
        }
        
        let repoResult = await this.movieRepository.searchByTitle(title, page);

        this.saveToCache(title, page, repoResult);

        return repoResult;
    }

    saveToCache(title: string, page: number, movies: MovieSearchResult) {
        this.cacheService.set(title, page, movies);
    }
}