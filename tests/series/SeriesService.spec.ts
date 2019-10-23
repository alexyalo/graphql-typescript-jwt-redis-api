import { assert, expect } from 'chai';
import 'mocha';
import sinon from "ts-sinon";

import { SeriesService } from '../../src/core/series/domain/SeriesService';
import { ISeriesRepository } from '../../src/core/series/domain/ISeriesRepository';
import { Series } from '../../src/core/series/domain/Series';
import { ISeriesCacheService } from '../../src/core/series/domain/ISeriesCacheService';
import { TestSeriesCacheService } from '../series/TestSeriesCacheService';
import { TestSeriesRepository } from './TestSeriesRepository';
import { SeriesSearchResult } from '../../src/core/series/domain/SeriesSearchResult';

describe('SeriesService Test', () => {

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

    it('should call parse and return the series array from cacheService', async () => {
        // given
        let expectedSeries = [series1, series2];
        let seriesServiceSearchFake = sinon.stub();
        let seriesRepository = getSeriesRepositoryWith(seriesServiceSearchFake);

        let fakeCacheResponse = new Promise((resolve) => resolve(expectedSeries));
        let cacheServiceGetFake = sinon.fake.returns(fakeCacheResponse);
        let cacheService = getCacheServiceWith(cacheServiceGetFake);
        let page = 1;

        // when
        let seriesService = new SeriesService(seriesRepository, cacheService);
        let actualSeries = await seriesService.search('Test', page);

        // then
        expect(actualSeries).to.eql(expectedSeries);
    });

    it('should get series array from seriesRepository and set cache when cache is null', async () => {
        // given
        let expectedSeries: SeriesSearchResult = {
            totalResults: 2,
            data: [series1, series2]
        };
        let seriesResult = new Promise((resolve) => resolve(expectedSeries));
        let seriesServiceSearchFake = sinon.fake.returns(seriesResult);
        let seriesRepository = getSeriesRepositoryWith(seriesServiceSearchFake);

        let cacheServiceGetFake = sinon.fake.returns(null);
        let cacheServiceSetSpy = sinon.spy();
        let cacheService = getCacheServiceWith(cacheServiceGetFake, cacheServiceSetSpy);
        let page = 1;

        // when
        let seriesService = new SeriesService(seriesRepository, cacheService);
        let actualSeries = await seriesService.search('Test', page);

        // then
        expect(actualSeries).to.eql(expectedSeries);
        assert(cacheServiceSetSpy.calledWithExactly('Test', page, expectedSeries));
    });

    /* --------------------- */

    function getSeriesRepositoryWith(fake: any): ISeriesRepository {
        let seriesRepository: ISeriesRepository = new TestSeriesRepository();
        seriesRepository.searchByTitle = fake; //seriesServiceSearchSpy;

        return seriesRepository;
    }

    function getCacheServiceWith(fakeGet: any, fakeSet?: any): ISeriesCacheService {
        let cacheService: ISeriesCacheService = new TestSeriesCacheService();
        cacheService.getByKey = fakeGet;
        cacheService.set = fakeSet;
        return cacheService;
    }

});