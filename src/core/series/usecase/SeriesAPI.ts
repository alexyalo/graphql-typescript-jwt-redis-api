import { SeriesService } from "../domain/SeriesService";
import { Series } from "../domain/Series";
import { SeriesSearchResult } from "../domain/SeriesSearchResult";

export class SeriesAPI {
  constructor(private seriesService: SeriesService){}

  getByTitle(title: string, page: number): Promise<SeriesSearchResult> {
    return this.seriesService.search(title, page);
  }
}