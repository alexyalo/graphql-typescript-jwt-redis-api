import { ISeriesCacheService } from "../../src/core/series/domain/ISeriesCacheService";
import { Series } from '../../src/core/series/domain/Series';

export class TestSeriesCacheService implements ISeriesCacheService {
    set(key: string, value: Series[]) {
        throw new Error("Method not implemented.");
    }
    getByKey(key: string): Promise<Array<Series>> {
        throw new Error("Method not implemented.");
    }
}