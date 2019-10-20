import { Movie } from './Movie';

export interface IMovieRepository {
    searchByTitle(searchValue: string) : Promise<Movie[]>;
}