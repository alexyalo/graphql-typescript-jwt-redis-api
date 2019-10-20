import { Movie } from "./Movie";
import { IMovieRepository } from "./IMovieRepository";
import { IMovieCacheService } from "./IMovieCacheService";

export class MovieService {
    constructor(private movieRepository: IMovieRepository, private cacheService: IMovieCacheService) { }

    public async search(title: string): Promise<Movie[]> {
        let cachedResult = await this.cacheService.getByKey(title);
        if (cachedResult) {
            return cachedResult;
        }
        
        let repoResult = await this.movieRepository.searchByTitle(title);

        this.saveToCache(title, repoResult);

        return repoResult;
    }

    saveToCache(title: string, movies: Movie[]) {
        this.cacheService.set(title, movies);
    }
}