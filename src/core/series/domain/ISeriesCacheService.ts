import { Series } from "./Series";
import { SeriesSearchResult } from "./SeriesSearchResult";

export interface ISeriesCacheService {
    set(key: string, page: number, value: SeriesSearchResult): void;
    getByKey(key: string, page: number) : Promise<SeriesSearchResult>;
}