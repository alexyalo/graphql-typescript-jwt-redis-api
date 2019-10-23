import { Episode } from "./Episode";

export interface EpisodeSearchResult {
    title: string,
    season: number,
    totalSeasons: number,
    data: Episode[]
}