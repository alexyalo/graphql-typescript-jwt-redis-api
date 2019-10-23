export interface SeasonApiResponse {
    Title: string;
    Season: string;
    totalSeasons: string;
    Episodes: SeasonEpisodeApiResponse[]
}

export interface SeasonEpisodeApiResponse {
    Title: string;
    Released: string;
    Episode: string;
    imdbRating: string;
    imdbID: string;
}