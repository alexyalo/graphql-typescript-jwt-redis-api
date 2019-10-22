import { DataSource } from "apollo-datasource";
import { IUseCaseProvider } from "../../dependency-injection/IUseCaseProvider";
import { MovieAPI } from "../../core/movie/usecase/MovieAPI";

export class MovieDataSource implements DataSource {
    context: any;

    constructor(private movieAPI: MovieAPI){}

    initialize(config) {
        this.context = config.context;
    }

    async searchMovies(title) {
        return await this.movieAPI.getByTitle(title);
    }
}