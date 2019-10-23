import { DataSource } from "apollo-datasource";
import { EpisodeAPI } from "../../core/episode/usecase/EpisodeAPI";

export class EpisodeDataSource implements DataSource {
    context: any;

    constructor(private episodeAPI: EpisodeAPI){}

    initialize(config) {
        this.context = config.context;
    }

    async searchEpisodes(title, season) {
        return await this.episodeAPI.getByTitle(title, season);
    }
}