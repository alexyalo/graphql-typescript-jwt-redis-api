import { ISeriesRepository } from "../domain/ISeriesRepository";
import { Series } from "../domain/Series";
import { IRestClient } from "../../../infrastructure/http/IRestClient";
import { ApiResponse } from "../../../infrastructure/http/ApiResponse";
import { SeriesSearchResult } from "../domain/SeriesSearchResult";

export class OMDBSeriesRepository implements ISeriesRepository {
    private domain = 'http://www.omdbapi.com';

    constructor(private httpClient: IRestClient, private apiKey: string) { }

    async searchByTitle(searchValue: string, page: number): Promise<SeriesSearchResult> {
        let response: ApiResponse = await this.httpClient.get<ApiResponse>(this.domain,
            `/?s=${searchValue}&type=series&page=${page}&apikey=${this.apiKey}`);

        let data: Series[] = [];
        if (response['Search']) {
            response.Search.forEach(item => {
                let series: Series = {
                    title: item.Title,
                    year: item.Year,
                    imdbID: item.imdbID,
                    poster: item.Poster,
                }
                data.push(series);
            });
        }

        let result: SeriesSearchResult = {
            data: data,
            totalResults: response['totalResults'] ? parseInt(response['totalResults']) : 0
        };

        return result;
    }
}