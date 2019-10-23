import { SeriesDataSource } from "./SeriesDataSource";

export const Query = {
    searchSeries: async (_, { title, page }, { dataSources }) => {
        let seriesDataSource: SeriesDataSource = dataSources.seriesDataSource;
        return await seriesDataSource.searchSeries(title, page);
    }
};