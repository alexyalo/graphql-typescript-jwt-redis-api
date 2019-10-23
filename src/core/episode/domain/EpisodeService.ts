import { Episode } from "./Episode";
import { IEpisodeRepository } from "./IEpisodeRepository";
import { IEpisodeCacheService } from "./IEpisodeCacheService";
import { EpisodeSearchResult } from "./EpisodeSearchResult";

export class EpisodeService {
    constructor(private episodeRepository: IEpisodeRepository, private cacheService: IEpisodeCacheService) { }

    public async search(title: string, season: number): Promise<EpisodeSearchResult> {
        let cachedResult = await this.cacheService.getByKey(title, season);
        if (cachedResult) {
            return cachedResult;
        }
        
        let repoResult = await this.episodeRepository.searchByTitle(title, season);

        this.saveToCache(title, season, repoResult);

        return repoResult;
    }

    saveToCache(title: string, season: number, episodes: EpisodeSearchResult) {
        this.cacheService.set(title, season, episodes);
    }
}