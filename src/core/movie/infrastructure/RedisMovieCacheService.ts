import { IMovieCacheService } from "../domain/IMovieCacheService";
import { Movie } from "../domain/Movie";

export class RedisMovieCacheService implements IMovieCacheService {
    set(key: string, value: Movie[]): void {
    }    
    
    getByKey(key: string): Promise<Movie[]> {
        return new Promise((resolve) => resolve());
    }
}