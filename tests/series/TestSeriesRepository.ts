import { ISeriesRepository } from "../../src/core/series/domain/ISeriesRepository";
import { Series } from "../../src/core/series/domain/Series";

export class TestSeriesRepository implements ISeriesRepository {
    searchByTitle(searchValue: string): Promise<Array<Series>> {
        throw new Error("Mock");
    }
}