import { Series } from "./Series";

export interface ISeriesCacheService {
    set(key: string, value: Series[]): void;
    getByKey(key: string) : Promise<Series[]>;
}