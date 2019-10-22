import { Episode } from "./Episode";

export interface IEpisodeCacheService {
    set(key: string, value: Episode[]): void;
    getByKey(key: string) : Promise<Episode[]>;
}