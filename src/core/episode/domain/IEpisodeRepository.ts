import { Episode } from './Episode';

export interface IEpisodeRepository {
    searchByTitle(searchValue: string) : Promise<Episode[]>;
}