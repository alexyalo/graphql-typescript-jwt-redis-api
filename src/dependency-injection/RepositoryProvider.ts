import { IRepositoryProvider } from "./IRepositoryProvider";
import { IMovieRepository } from "../core/movie/domain/IMovieRepository";
import { OMDBMovieRepository } from "../core/movie/infrastructure/OMDBMovieRepository";
import { IRestClient } from "../infrastructure/http/IRestClient";
import { Environment } from "../environment";
import { IEpisodeRepository } from "../core/episode/domain/IEpisodeRepository";
import { OMDBEpisodeRepository } from "../core/episode/infrastructure/OMDBEpisodeRepository";
import { ISeriesRepository } from "../core/series/domain/ISeriesRepository";
import { OMDBSeriesRepository } from "../core/series/infrastructure/OMDBSeriesRepository";

export class RepositoryProvider implements IRepositoryProvider {
    
    constructor(private restClient: IRestClient, private environment: Environment){}

    getSeriesRepository(): ISeriesRepository {
        return new OMDBSeriesRepository(this.restClient, this.environment.omdbApiKey);
    }

    getEpisodeRepository(): IEpisodeRepository {
        return new OMDBEpisodeRepository(this.restClient, this.environment.omdbApiKey);
    }

    getMovieRepository(): IMovieRepository {
        return new OMDBMovieRepository(this.restClient, this.environment.omdbApiKey);
    }
    
}