import { EpisodeSearchResult } from './EpisodeSearchResult';

export interface IEpisodeRepository {
    searchByTitle(searchValue: string, season: number) : Promise<EpisodeSearchResult>;
}