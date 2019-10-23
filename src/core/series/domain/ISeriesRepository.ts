import { Series } from './Series';
import { SeriesSearchResult } from './SeriesSearchResult';

export interface ISeriesRepository {
    searchByTitle(searchValue: string, page) : Promise<SeriesSearchResult>;
}