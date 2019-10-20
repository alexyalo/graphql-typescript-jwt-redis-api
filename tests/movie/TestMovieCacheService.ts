import { IMovieCacheService } from "../../src/movie/domain/IMovieCacheService";
import { Movie } from '../../src/movie/domain/Movie';

export class TestMovieCacheService implements IMovieCacheService {
    set(key: string, value: Movie[]) {
        throw new Error("Method not implemented.");
    }
    getByKey(key: string): Promise<Array<Movie>> {
        throw new Error("Method not implemented.");
    }
}