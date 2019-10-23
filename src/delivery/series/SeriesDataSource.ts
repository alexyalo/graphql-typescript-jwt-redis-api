import { DataSource } from "apollo-datasource";
import { SeriesAPI } from "../../core/series/usecase/SeriesAPI";

export class SeriesDataSource implements DataSource {
    context: any;

    constructor(private seriesAPI: SeriesAPI){}

    initialize(config) {
        this.context = config.context;
    }

    async searchSeries(title, page) {
        return await this.seriesAPI.getByTitle(title, page);
    }
}