import { ISeriesRepository } from "../../src/core/series/domain/ISeriesRepository";
import { SeriesSearchResult } from "../../src/core/series/domain/SeriesSearchResult";

export class TestSeriesRepository implements ISeriesRepository {
    searchByTitle(searchValue: string, page: number): Promise<SeriesSearchResult> {
        throw new Error("Mock");
    }
}