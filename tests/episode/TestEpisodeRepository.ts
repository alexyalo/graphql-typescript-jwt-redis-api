import { IEpisodeRepository } from "../../src/core/episode/domain/IEpisodeRepository";
import { Episode } from "../../src/core/episode/domain/Episode";

export class TestEpisodeRepository implements IEpisodeRepository {
    searchByTitle(searchValue: string): Promise<Array<Episode>> {
        throw new Error("Mock");
    }
}