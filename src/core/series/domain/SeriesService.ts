import { Series } from "./Series";
import { ISeriesRepository } from "./ISeriesRepository";
import { ISeriesCacheService } from "./ISeriesCacheService";

export class SeriesService {
    constructor(private seriesRepository: ISeriesRepository, private cacheService: ISeriesCacheService) { }

    public async search(title: string): Promise<Series[]> {
        let cachedResult = await this.cacheService.getByKey(title);
        if (cachedResult) {
            return cachedResult;
        }
        
        let repoResult = await this.seriesRepository.searchByTitle(title);

        this.saveToCache(title, repoResult);

        return repoResult;
    }

    saveToCache(title: string, movies: Series[]) {
        this.cacheService.set(title, movies);
    }
}