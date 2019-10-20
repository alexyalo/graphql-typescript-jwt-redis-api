import { IEpisodeRepository } from "../../src/episode/domain/IEpisodeRepository";
import { Episode } from "../../src/episode/domain/Episode";

export class TestEpisodeRepository implements IEpisodeRepository {
    searchByTitle(searchValue: string): Promise<Array<Episode>> {
        throw new Error("Mock");
    }
}