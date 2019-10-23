import { Movie } from './Movie';
import { MovieSearchResult } from './MovieSearchResult';

export interface IMovieRepository {
    searchByTitle(searchValue: string, page: number) : Promise<MovieSearchResult>;
}