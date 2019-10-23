import { ISeriesCacheService } from "../../src/core/series/domain/ISeriesCacheService";
import { Series } from '../../src/core/series/domain/Series';
import { SeriesSearchResult } from "../../src/core/series/domain/SeriesSearchResult";

export class TestSeriesCacheService implements ISeriesCacheService {
    set(title: string, page: number, value: SeriesSearchResult) {
    }
    getByKey(title: string, page: number): Promise<SeriesSearchResult> {
        return new Promise((resolve) => resolve());
    }
}