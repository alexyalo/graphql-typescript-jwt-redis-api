import { assert, expect } from 'chai';
import 'mocha';
import sinon from "ts-sinon";

import { EpisodeService } from '../../src/episode/domain/EpisodeService';
import { IEpisodeRepository } from '../../src/episode/domain/IEpisodeRepository';
import { Episode } from '../../src/episode/domain/Episode';
import { IEpisodeCacheService } from '../../src/episode/domain/IEpisodeCacheService';
import { TestEpisodeCacheService } from '../episode/TestEpisodeCacheService';
import { TestEpisodeRepository } from './TestEpisodeRepository';

describe('EpisodeService Test', () => {

    let episode1: Episode = {
        title: 'Test Episode 1',
        year: 1980,
        imdbID: "imdbID",
        type: "episode",
        poster: "test"
    };
    let episode2: Episode = {
        title: 'Test Episode 2',
        year: 1982,
        imdbID: "imdbID",
        type: "episode",
        poster: "test"
    };

    it('should call parse and return the episode array from cacheService', async () => {
        // given
        let expectedEpisode = [episode1, episode2];
        let episodeServiceSearchFake = sinon.stub();
        let episodeRepository = getEpisodeRepositoryWith(episodeServiceSearchFake);

        let fakeCacheResponse = new Promise((resolve) => resolve(expectedEpisode));
        let cacheServiceGetFake = sinon.fake.returns(fakeCacheResponse);
        let cacheService = getCacheServiceWith(cacheServiceGetFake);

        // when
        let episodeService = new EpisodeService(episodeRepository, cacheService);
        let actualEpisode = await episodeService.search('Test');

        // then
        expect(actualEpisode).to.eql(expectedEpisode);
    });

    it('should get episode array from episodeRepository and set cache when cache is null', async () => {
        // given
        let expectedEpisode = [episode1, episode2];
        let episodeResult = new Promise((resolve) => resolve(expectedEpisode));
        let episodeServiceSearchFake = sinon.fake.returns(episodeResult);
        let episodeRepository = getEpisodeRepositoryWith(episodeServiceSearchFake);

        let cacheServiceGetFake = sinon.fake.returns(null);
        let cacheServiceSetSpy = sinon.spy();
        let cacheService = getCacheServiceWith(cacheServiceGetFake, cacheServiceSetSpy);

        // when
        let episodeService = new EpisodeService(episodeRepository, cacheService);
        let actualEpisode = await episodeService.search('Test');

        // then
        expect(actualEpisode).to.eql(expectedEpisode);
        assert(cacheServiceSetSpy.calledWithExactly('Test', expectedEpisode));
    });

    /* --------------------- */

    function getEpisodeRepositoryWith(fake: any): IEpisodeRepository {
        let episodeRepository: IEpisodeRepository = new TestEpisodeRepository();
        episodeRepository.searchByTitle = fake; //episodeServiceSearchSpy;

        return episodeRepository;
    }

    function getCacheServiceWith(fakeGet: any, fakeSet?: any): IEpisodeCacheService {
        let cacheService: IEpisodeCacheService = new TestEpisodeCacheService();
        cacheService.getByKey = fakeGet;
        cacheService.set = fakeSet;
        return cacheService;
    }

});