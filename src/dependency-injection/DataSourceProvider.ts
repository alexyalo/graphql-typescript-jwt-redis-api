import { IDataSourceProvider } from "./IDataSourceProvider";
import { MovieDataSource } from "../delivery/movies/MovieDataSource";
import { IUseCaseProvider } from "./IUseCaseProvider";

export class DataSourceProvider implements IDataSourceProvider {
    constructor(private useCaseProvider: IUseCaseProvider) {}
    
    getMovieDataSource(): MovieDataSource {
        return new MovieDataSource(this.useCaseProvider.getMovieAPI());
    }
}