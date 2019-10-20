import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { ISeriesRepository } from '../../../src/series/domain/ISeriesRepository';
import { OMDBSeriesRepository } from '../../../src/series/infrastructure/OMDBSeriesRepository';
import { TestHttpClient } from '../../TestHttpClient';
import { Series } from '../../../src/series/domain/Series';
import { ApiResponse } from '../../../src/external/ApiResponse';

describe('OMDBSeriesRepository Test', () => {

    let series1: Series = {
        title: 'Test Series 1',
        year: 1980,
        imdbID: "imdbID",
        type: "series",
        poster: "test"
    };
    let series2: Series = {
        title: 'Test Series 2',
        year: 1982,
        imdbID: "imdbID",
        type: "series",
        poster: "test"
    };

    it('should return an array of Series when search by title', async () => {
        // given
        let httpClient = new TestHttpClient();
        let seriess = [series1, series2];
        let apiResponse: ApiResponse<Series[]> = {
            Search: seriess 
        };
        let fakeResponse = sinon.fake.returns(new Promise((resolve) => resolve(apiResponse)));
        httpClient.get = fakeResponse;
        
        // when
        let seriesRepository: ISeriesRepository = new OMDBSeriesRepository(httpClient);
        let actualResponse = await seriesRepository.searchByTitle('Test');

        // then
        expect(actualResponse).to.eql(seriess);
    });

});