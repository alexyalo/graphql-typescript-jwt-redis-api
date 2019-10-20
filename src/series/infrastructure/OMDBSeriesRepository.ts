import { ISeriesRepository } from "../domain/ISeriesRepository";
import { Series } from "../domain/Series";
import { IRestClient } from "../../external/IRestClient";
import { ApiResponse } from "../../external/ApiResponse";

export class OMDBSeriesRepository implements ISeriesRepository {
    private apiKey = 'b11d31f0';
    private domain = 'http://www.omdbapi.com';

    constructor(private httpClient: IRestClient) {}

    async searchByTitle(searchValue: string): Promise<Series[]> {
        let response: ApiResponse<Series[]> = await this.httpClient.get<ApiResponse<Series[]>>(this.domain, `/?s=${searchValue}&type=series&apikey=${this.apiKey}`);
        
        return response.Search;
    }
}