import { Series } from './Series';

export interface ISeriesRepository {
    searchByTitle(searchValue: string) : Promise<Series[]>;
}