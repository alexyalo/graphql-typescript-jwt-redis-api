import { assert } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { EpisodeAPI } from '../../src/episode/usecase/EpisodeAPI';
import { EpisodeService } from '../../src/episode/domain/EpisodeService';
import { TestEpisodeCacheService } from '../episode/TestEpisodeCacheService';
import { TestEpisodeRepository } from './TestEpisodeRepository';

describe('EpisodeAPI Test', () => {
 
  it('should call EpisodeRepository when a search is done', () => {
    let episodeService = new EpisodeService(new TestEpisodeRepository(), new TestEpisodeCacheService());
    let searchSpy = sinon.spy();
    episodeService.search = searchSpy;

    let episodeAPI = new EpisodeAPI(episodeService);

    episodeAPI.getByTitle('The Godfather');
    
    assert(searchSpy.calledWithExactly('The Godfather'));
  });
 
});