import { IMovieRepository } from "../../src/core/movie/domain/IMovieRepository";
import { Movie } from "../../src/core/movie/domain/Movie";

export class TestMovieRepository implements IMovieRepository {
    searchByTitle(searchValue: string): Promise<Array<Movie>> {
        throw new Error("Mock");
    }
}