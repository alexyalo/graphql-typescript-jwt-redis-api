import { Movie } from "./Movie";

export interface MovieSearchResult {
    data: Movie[],
    totalResults: number
}