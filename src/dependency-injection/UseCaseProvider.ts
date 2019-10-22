import { IUseCaseProvider } from "./IUseCaseProvider";
import { MovieAPI } from "../core/movie/usecase/MovieAPI";
import { IServiceProvider } from "./IServiceProvider";

export class UseCaseProvider implements IUseCaseProvider{

    constructor(private serviceProvider: IServiceProvider){}

    getMovieAPI(): MovieAPI {
        return new MovieAPI(this.serviceProvider.getMovieService());
    }
}