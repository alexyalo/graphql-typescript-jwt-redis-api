import { ISeriesRepository } from "./ISeriesRepository";
import { ISeriesCacheService } from "./ISeriesCacheService";
import { SeriesSearchResult } from "./SeriesSearchResult";

export class SeriesService {
    constructor(private seriesRepository: ISeriesRepository, private cacheService: ISeriesCacheService) { }

    public async search(title: string, page: number): Promise<SeriesSearchResult> {
        let cachedResult = await this.cacheService.getByKey(title, page);
        if (cachedResult) {
            return cachedResult;
        }
        
        let repoResult = await this.seriesRepository.searchByTitle(title, page);

        this.saveToCache(title, page, repoResult);

        return repoResult;
    }

    saveToCache(title: string, page: number, movies: SeriesSearchResult) {
        this.cacheService.set(title, page, movies);
    }
}