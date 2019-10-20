import { IMovieRepository } from "../../src/movie/domain/IMovieRepository";
import { Movie } from "../../src/movie/domain/Movie";

export class TestMovieRepository implements IMovieRepository {
    searchByTitle(searchValue: string): Promise<Array<Movie>> {
        throw new Error("Mock");
    }
}