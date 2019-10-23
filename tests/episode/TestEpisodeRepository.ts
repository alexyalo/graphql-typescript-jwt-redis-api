import { IEpisodeRepository } from "../../src/core/episode/domain/IEpisodeRepository";
import { Episode } from "../../src/core/episode/domain/Episode";
import { EpisodeSearchResult } from "../../src/core/episode/domain/EpisodeSearchResult";

export class TestEpisodeRepository implements IEpisodeRepository {
    searchByTitle(searchValue: string, season: number): Promise<EpisodeSearchResult> {
        throw new Error("Mock");
    }
}