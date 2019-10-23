import { EpisodeDataSource } from "./EpisodeDataSource";

export const Query = {
    searchEpisodes: async (_, { title, season }, { dataSources }) => {
        let episodeDataSource: EpisodeDataSource = dataSources.episodeDataSource;
        return await episodeDataSource.searchEpisodes(title, season);
    }
};