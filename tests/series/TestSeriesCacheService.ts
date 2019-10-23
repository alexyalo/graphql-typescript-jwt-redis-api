import { ISeriesCacheService } from "../../src/core/series/domain/ISeriesCacheService";
import { Series } from '../../src/core/series/domain/Series';
import { SeriesSearchResult } from "../../src/core/series/domain/SeriesSearchResult";

export class TestSeriesCacheService implements ISeriesCacheService {
    set(title: string, page: number, value: SeriesSearchResult) {
        throw new Error("Method not implemented.");
    }
    getByKey(title: string, page: number): Promise<SeriesSearchResult> {
        throw new Error("Method not implemented.");
    }
}