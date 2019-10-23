import { EpisodeService } from "../domain/EpisodeService";
import { Episode } from "../domain/Episode";
import { EpisodeSearchResult } from "../domain/EpisodeSearchResult";

export class EpisodeAPI {
  constructor(private episodeService: EpisodeService){}

  getByTitle(title: string, season: number): Promise<EpisodeSearchResult> {
    return this.episodeService.search(title, season);
  }
}