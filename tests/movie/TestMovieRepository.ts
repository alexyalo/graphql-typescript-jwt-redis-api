import { IMovieRepository } from "../../src/core/movie/domain/IMovieRepository";
import { Movie } from "../../src/core/movie/domain/Movie";
import { MovieSearchResult } from "../../src/core/movie/domain/MovieSearchResult";

export class TestMovieRepository implements IMovieRepository {
    searchByTitle(searchValue: string, page: number): Promise<MovieSearchResult> {
        throw new Error("Mock");
    }
}