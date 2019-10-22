import { EpisodeService } from "../domain/EpisodeService";
import { Episode } from "../domain/Episode";

export class EpisodeAPI {
  constructor(private episodeService: EpisodeService){}

  getByTitle(title: string): Promise<Episode[]> {
    return this.episodeService.search(title);
  }
}