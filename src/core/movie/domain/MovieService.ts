import { Movie } from "./Movie";
import { IMovieRepository } from "./IMovieRepository";
import { IMovieCacheService } from "./IMovieCacheService";

export class MovieService {
    constructor(private movieRepository: IMovieRepository, private cacheService: IMovieCacheService) { }

    public async search(title: string): Promise<Movie[]> {
        console.log('hola');
        let cachedResult = await this.cacheService.getByKey(title);
        if (cachedResult) {
            return cachedResult;
        }
        
        let repoResult = await this.movieRepository.searchByTitle(title);
console.log('reporesult', repoResult);
        this.saveToCache(title, repoResult);

        return repoResult;
    }

    saveToCache(title: string, movies: Movie[]) {
        this.cacheService.set(title, movies);
    }
}