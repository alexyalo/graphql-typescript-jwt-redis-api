import { EpisodeSearchResult } from "./EpisodeSearchResult";

export interface IEpisodeCacheService {
    set(title: string, season: number, value: EpisodeSearchResult): void;
    getByKey(title: string, season: number) : Promise<EpisodeSearchResult>;
}