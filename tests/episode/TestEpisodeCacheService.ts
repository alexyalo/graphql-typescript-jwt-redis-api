import { IEpisodeCacheService } from "../../src/core/episode/domain/IEpisodeCacheService";
import { Episode } from '../../src/core/episode/domain/Episode';

export class TestEpisodeCacheService implements IEpisodeCacheService {
    set(key: string, value: Episode[]) {
        throw new Error("Method not implemented.");
    }
    getByKey(key: string): Promise<Array<Episode>> {
        throw new Error("Method not implemented.");
    }
}