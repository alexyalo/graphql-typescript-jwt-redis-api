import { IMovieRepository } from "../domain/IMovieRepository";
import { Movie } from "../domain/Movie";
import { IRestClient } from "../../../infrastructure/http/IRestClient";
import { ApiResponse } from "../../../infrastructure/http/ApiResponse";
import { ApiResponseItem } from "../../../infrastructure/http/ApiResponseItem";
import { MovieSearchResult } from "../domain/MovieSearchResult";

export class OMDBMovieRepository implements IMovieRepository {
    private domain = 'http://www.omdbapi.com';

    constructor(private httpClient: IRestClient, private apiKey: string) { }

    async searchByTitle(searchValue: string, page: number): Promise<MovieSearchResult> {
        let response: ApiResponse = await this.httpClient.get<ApiResponse>(this.domain,
            `/?s=${searchValue}&type=movie&page=${page}&apikey=${this.apiKey}`);

        let data: Movie[] = [];
        
        if (response['Search']) {
            response['Search'].forEach(item => {
                let movie: Movie = {
                    title: item.Title,
                    year: item.Year,
                    imdbID: item.imdbID,
                    poster: item.Poster,
                }
                data.push(movie);
            });
        }

        let result: MovieSearchResult = {
            data: data,
            totalResults: response['totalResults'] ? parseInt(response['totalResults']) : 0
        };

        return result;
    }
}