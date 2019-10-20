import { Episode } from "./Episode";
import { IEpisodeRepository } from "./IEpisodeRepository";
import { IEpisodeCacheService } from "./IEpisodeCacheService";

export class EpisodeService {
    constructor(private episodeRepository: IEpisodeRepository, private cacheService: IEpisodeCacheService) { }

    public async search(title: string): Promise<Episode[]> {
        let cachedResult = await this.cacheService.getByKey(title);
        if (cachedResult) {
            return cachedResult;
        }
        
        let repoResult = await this.episodeRepository.searchByTitle(title);

        this.saveToCache(title, repoResult);

        return repoResult;
    }

    saveToCache(title: string, movies: Episode[]) {
        this.cacheService.set(title, movies);
    }
}