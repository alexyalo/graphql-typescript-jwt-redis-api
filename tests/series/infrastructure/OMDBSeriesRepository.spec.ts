import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { ISeriesRepository } from '../../../src/core/series/domain/ISeriesRepository';
import { OMDBSeriesRepository } from '../../../src/core/series/infrastructure/OMDBSeriesRepository';
import { TestHttpClient } from '../../TestHttpClient';
import { Series } from '../../../src/core/series/domain/Series';
import { ApiResponse } from '../../../src/infrastructure/http/ApiResponse';
import { ApiResponseItem } from '../../../src/infrastructure/http/ApiResponseItem';
import { SeriesSearchResult } from '../../../src/core/series/domain/SeriesSearchResult';

describe('OMDBSeriesRepository Test', () => {

    let series1: Series = {
        title: 'Test Series 1',
        year: 1980,
        imdbID: "imdbID",
        poster: "test"
    };
    let series2: Series = {
        title: 'Test Series 2',
        year: 1982,
        imdbID: "imdbID",
        poster: "test"
    };

    let responseItem1: ApiResponseItem = {
        Title: 'Test Series 1',
        Year: 1980,
        imdbID: "imdbID",
        Poster: "test"
    };
    let responseItem2: ApiResponseItem = {
        Title: 'Test Series 2',
        Year: 1982,
        imdbID: "imdbID",
        Poster: "test"
    };

    it('should return expected SeriesSearchResult when search by title and page', async () => {
        // given
        let httpClient = new TestHttpClient();
        let items: ApiResponseItem[] = [responseItem1, responseItem2];
        let series: SeriesSearchResult = {
            totalResults: 2,
            data: [series1, series2]
        }
        let apiResponse: ApiResponse = {
            Search: items,
            Response: "True",
            totalResults: "2"
        };
        let fakeResponse = sinon.fake.returns(new Promise((resolve) => resolve(apiResponse)));
        httpClient.get = fakeResponse;
        let page = 1;

        // when
        let seriesRepository: ISeriesRepository = new OMDBSeriesRepository(httpClient, 'testApiKey');
        let actualResponse = await seriesRepository.searchByTitle('Test', page);

        // then
        expect(actualResponse).to.eql(series);
    });

});