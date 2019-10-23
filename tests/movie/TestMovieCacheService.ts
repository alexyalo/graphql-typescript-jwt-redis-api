import { IMovieCacheService } from "../../src/core/movie/domain/IMovieCacheService";
import { Movie } from '../../src/core/movie/domain/Movie';
import { MovieSearchResult } from "../../src/core/movie/domain/MovieSearchResult";

export class TestMovieCacheService implements IMovieCacheService {
    set(title: string, page: number, value: MovieSearchResult) {
        throw new Error("Method not implemented.");
    }
    getByKey(title: string, page: number,): Promise<MovieSearchResult> {
        throw new Error("Method not implemented.");
    }
}