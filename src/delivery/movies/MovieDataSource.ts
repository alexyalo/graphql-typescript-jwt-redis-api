import { DataSource } from "apollo-datasource";
import { MovieAPI } from "../../core/movie/usecase/MovieAPI";

export class MovieDataSource implements DataSource {
    context: any;

    constructor(private movieAPI: MovieAPI){}

    initialize(config) {
        this.context = config.context;
    }

    async searchMovies(title: string, page: number) {
        return await this.movieAPI.getByTitle(title, page);
    }
}