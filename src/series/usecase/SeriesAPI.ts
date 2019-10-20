import { SeriesService } from "../domain/SeriesService";
import { Series } from "../domain/Series";

export class SeriesAPI {
  constructor(private seriesService: SeriesService){}

  getByTitle(title: string): Promise<Series[]> {
    return this.seriesService.search(title);
  }
}