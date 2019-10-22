import { MovieAPI } from "../../core/movie/usecase/MovieAPI";
import { MovieDataSource } from "./MovieDataSource";

export const Query = {
    searchMovies: async (_, { title }, { dataSources }) => {
        let movieDataSource: MovieDataSource = dataSources.movieDataSource;
        return await movieDataSource.searchMovies(title);
    }
};