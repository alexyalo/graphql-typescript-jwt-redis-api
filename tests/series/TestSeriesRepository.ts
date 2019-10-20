import { ISeriesRepository } from "../../src/series/domain/ISeriesRepository";
import { Series } from "../../src/series/domain/Series";

export class TestSeriesRepository implements ISeriesRepository {
    searchByTitle(searchValue: string): Promise<Array<Series>> {
        throw new Error("Mock");
    }
}