import { IEpisodeRepository } from "../domain/IEpisodeRepository";
import { Episode } from "../domain/Episode";
import { IRestClient } from "../../external/IRestClient";
import { ApiResponse } from "../../external/ApiResponse";

export class OMDBEpisodeRepository implements IEpisodeRepository {
    private apiKey = 'b11d31f0';
    private domain = 'http://www.omdbapi.com';

    constructor(private httpClient: IRestClient) {}

    async searchByTitle(searchValue: string): Promise<Episode[]> {
        let response: ApiResponse<Episode[]> = await this.httpClient.get<ApiResponse<Episode[]>>(this.domain, `/?s=${searchValue}&type=episode&apikey=${this.apiKey}`);
        
        return response.Search;
    }
}