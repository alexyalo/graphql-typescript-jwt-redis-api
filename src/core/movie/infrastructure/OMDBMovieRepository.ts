import { IMovieRepository } from "../domain/IMovieRepository";
import { Movie } from "../domain/Movie";
import { IRestClient } from "../../../infrastructure/http/IRestClient";
import { ApiResponse } from "../../../infrastructure/http/ApiResponse";
import { ApiResponseItem } from "../../../infrastructure/http/ApiResponseItem";

export class OMDBMovieRepository implements IMovieRepository {
    private domain = 'http://www.omdbapi.com';

    constructor(private httpClient: IRestClient, private apiKey: string) {}

    async searchByTitle(searchValue: string): Promise<Movie[]> {
        let response: ApiResponse = await this.httpClient.get<ApiResponse>(this.domain, 
            `/?s=${searchValue}&type=movie&apikey=${this.apiKey}`);
        
        let result: Movie[] = [];
        response.Search.forEach(item => {
            let movie: Movie = {
                title: item.Title,
                year: item.Year,
                imdbID: item.imdbID,
                poster: item.Poster,
            }
            result.push(movie);
        });

        return result;
    }
}