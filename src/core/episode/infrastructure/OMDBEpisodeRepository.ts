import { IEpisodeRepository } from "../domain/IEpisodeRepository";
import { Episode } from "../domain/Episode";
import { IRestClient } from "../../../infrastructure/http/IRestClient";
import { EpisodeSearchResult } from "../domain/EpisodeSearchResult";
import { SeasonApiResponse } from "./SeasonApiResponse";

export class OMDBEpisodeRepository implements IEpisodeRepository {
    private domain = 'http://www.omdbapi.com';

    constructor(private httpClient: IRestClient, private apiKey: string) { }

    async searchByTitle(searchValue: string, season: number): Promise<EpisodeSearchResult> {
        let response: SeasonApiResponse = await this.httpClient.get<SeasonApiResponse>(this.domain,
            `/?t=${searchValue}&Season=${season}&apikey=${this.apiKey}`);

        let data: Episode[] = [];
        if (response['Episodes']) {
            response['Episodes'].forEach(item => {
                let episode: Episode = {
                    title: item.Title,
                    released: item.Released,
                    episode: parseInt(item.Episode),
                    imdbRating: parseInt(item.imdbRating),
                    imdbID: item.imdbID
                }

                data.push(episode);
            });
        }

        let result: EpisodeSearchResult = {
            title: response['Title'] || searchValue,
            season: parseInt(response['Season']) || 0,
            totalSeasons: parseInt(response['totalSeasons']) || 0,
            data: data
        }

        return result;
    }
}