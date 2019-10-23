import { MovieDataSource } from "./MovieDataSource";

export const Query = {
    searchMovies: async (_, { title, page }, { dataSources }) => {
        let movieDataSource: MovieDataSource = dataSources.movieDataSource;
        return await movieDataSource.searchMovies(title, page);
    }
};