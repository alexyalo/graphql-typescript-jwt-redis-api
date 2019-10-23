import { IUseCaseProvider } from "./IUseCaseProvider";
import { MovieAPI } from "../core/movie/usecase/MovieAPI";
import { IServiceProvider } from "./IServiceProvider";
import { EpisodeAPI } from "../core/episode/usecase/EpisodeAPI";
import { SeriesAPI } from "../core/series/usecase/SeriesAPI";

export class UseCaseProvider implements IUseCaseProvider{
    
    constructor(private serviceProvider: IServiceProvider){}

    getSeriesAPI(): SeriesAPI {
        return new SeriesAPI(this.serviceProvider.getSeriesService());
    }

    getEpisodeAPI(): EpisodeAPI {
        return new EpisodeAPI(this.serviceProvider.getEpisodeService());
    }

    getMovieAPI(): MovieAPI {
        return new MovieAPI(this.serviceProvider.getMovieService());
    }
}