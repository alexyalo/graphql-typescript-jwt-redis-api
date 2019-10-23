import { Movie } from "./Movie";
import { MovieSearchResult } from "./MovieSearchResult";

export interface IMovieCacheService {
    set(title: string, page: number, value: MovieSearchResult);
    getByKey(title: string, page: number) : Promise<MovieSearchResult>;
}