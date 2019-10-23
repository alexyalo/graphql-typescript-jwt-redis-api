import { IDataSourceProvider } from "./IDataSourceProvider";
import { MovieDataSource } from "../delivery/movies/MovieDataSource";
import { IUseCaseProvider } from "./IUseCaseProvider";
import { EpisodeDataSource } from "../delivery/episodes/EpisodeDataSource";
import { SeriesDataSource } from "../delivery/series/SeriesDataSource";

export class DataSourceProvider implements IDataSourceProvider {
    
    constructor(private useCaseProvider: IUseCaseProvider) {}
    
    getSeriesDataSource(): SeriesDataSource {
        return new SeriesDataSource(this.useCaseProvider.getSeriesAPI());
    }

    getEpisodeDataSource(): EpisodeDataSource {
        return new EpisodeDataSource(this.useCaseProvider.getEpisodeAPI());
    }

    getMovieDataSource(): MovieDataSource {
        return new MovieDataSource(this.useCaseProvider.getMovieAPI());
    }
}