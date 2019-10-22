import { MovieDataSource } from "../delivery/movies/MovieDataSource";

export interface IDataSourceProvider {
    getMovieDataSource(): MovieDataSource;
}