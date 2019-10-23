import { assert } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { EpisodeAPI } from '../../src/core/episode/usecase/EpisodeAPI';
import { EpisodeService } from '../../src/core/episode/domain/EpisodeService';
import { TestEpisodeCacheService } from '../episode/TestEpisodeCacheService';
import { TestEpisodeRepository } from './TestEpisodeRepository';

describe('EpisodeAPI Test', () => {
 
  it('should call EpisodeRepository when a search is done', () => {
    // given
    let episodeService = new EpisodeService(new TestEpisodeRepository(), new TestEpisodeCacheService());
    let searchSpy = sinon.spy();
    episodeService.search = searchSpy;
    let season = 1;

    // when
    let episodeAPI = new EpisodeAPI(episodeService);
    episodeAPI.getByTitle('The Godfather', season);
    
    // then
    assert(searchSpy.calledWithExactly('The Godfather', season));
  });
 
});