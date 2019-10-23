import { IEpisodeCacheService } from "../../src/core/episode/domain/IEpisodeCacheService";
import { Episode } from '../../src/core/episode/domain/Episode';
import { EpisodeSearchResult } from "../../src/core/episode/domain/EpisodeSearchResult";

export class TestEpisodeCacheService implements IEpisodeCacheService {
    set(key: string, season: number, value: EpisodeSearchResult) {
    }

    getByKey(key: string, season: number): Promise<EpisodeSearchResult> {
        return new Promise((resolve) => resolve());
    }
}