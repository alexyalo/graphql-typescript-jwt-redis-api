import { assert } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { SeriesAPI } from '../../src/core/series/usecase/SeriesAPI';
import { SeriesService } from '../../src/core/series/domain/SeriesService';
import { TestSeriesCacheService } from '../series/TestSeriesCacheService';
import { TestSeriesRepository } from './TestSeriesRepository';

describe('SeriesAPI Test', () => {
 
  it('should call SeriesRepository when a search is done', () => {
    let seriesService = new SeriesService(new TestSeriesRepository(), new TestSeriesCacheService());
    let searchSpy = sinon.spy();
    seriesService.search = searchSpy;

    let seriesAPI = new SeriesAPI(seriesService);

    seriesAPI.getByTitle('The Godfather');
    
    assert(searchSpy.calledWithExactly('The Godfather'));
  });
 
});