import { Movie } from "./Movie";

export interface IMovieCacheService {
    set(key: string, value: Movie[]): void;
    getByKey(key: string) : Promise<Movie[]>;
}