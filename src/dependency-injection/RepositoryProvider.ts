import { IRepositoryProvider } from "./IRepositoryProvider";
import { IMovieRepository } from "../core/movie/domain/IMovieRepository";
import { OMDBMovieRepository } from "../core/movie/infrastructure/OMDBMovieRepository";
import { IRestClient } from "../infrastructure/http/IRestClient";
import { Environment } from "../environment";

export class RepositoryProvider implements IRepositoryProvider {

    constructor(private restClient: IRestClient, private environment: Environment){}

    getMovieRepository(): IMovieRepository {
        return new OMDBMovieRepository(this.restClient, this.environment.omdbApiKey);
    }
    
}