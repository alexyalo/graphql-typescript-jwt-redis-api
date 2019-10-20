import { IMovieRepository } from "../domain/IMovieRepository";
import { Movie } from "../domain/Movie";
import { IRestClient } from "../../external/IRestClient";
import { ApiResponse } from "../../external/ApiResponse";

export class OMDBMovieRepository implements IMovieRepository {
    private apiKey = 'b11d31f0';
    private domain = 'http://www.omdbapi.com';

    constructor(private httpClient: IRestClient) {}

    async searchByTitle(searchValue: string): Promise<Movie[]> {
        let response: ApiResponse<Movie[]> = await this.httpClient.get<ApiResponse<Movie[]>>(this.domain, `/?s=${searchValue}&type=movie&apikey=${this.apiKey}`);
        
        return response.Search;
    }
}