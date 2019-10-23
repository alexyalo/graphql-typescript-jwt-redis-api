import { assert, expect } from 'chai';
import 'mocha';
import sinon from "ts-sinon";

import { EpisodeService } from '../../src/core/episode/domain/EpisodeService';
import { IEpisodeRepository } from '../../src/core/episode/domain/IEpisodeRepository';
import { Episode } from '../../src/core/episode/domain/Episode';
import { IEpisodeCacheService } from '../../src/core/episode/domain/IEpisodeCacheService';
import { TestEpisodeCacheService } from '../episode/TestEpisodeCacheService';
import { TestEpisodeRepository } from './TestEpisodeRepository';
import { EpisodeSearchResult } from '../../src/core/episode/domain/EpisodeSearchResult';

describe('EpisodeService Test', () => {
    
    let episode1: Episode = {
        title: 'Test Episode 1',
        released: '1994-02-02',
        episode: 1,
        imdbID: "imdbID",
        imdbRating: 10
    };
    let episode2: Episode = {
        title: 'Test Episode 2',
        released: '1994-02-02',
        episode: 1,
        imdbID: "imdbID",
        imdbRating: 10
    };

    it('should call parse and return the EpisodeSearchResult from cacheService', async () => {
        // given
        let expectedEpisodes: EpisodeSearchResult = {
            title: 'Test',
            season: 1,
            totalSeasons: 1,
            data: [episode1, episode2]
        }
        let episodeServiceSearchFake = sinon.stub();
        let episodeRepository = getEpisodeRepositoryWith(episodeServiceSearchFake);

        let fakeCacheResponse = new Promise((resolve) => resolve(expectedEpisodes));
        let cacheServiceGetFake = sinon.fake.returns(fakeCacheResponse);
        let cacheService = getCacheServiceWith(cacheServiceGetFake);
        let season = 1;

        // when
        let episodeService = new EpisodeService(episodeRepository, cacheService);
        let actualEpisodes = await episodeService.search('Test', season);

        // then
        expect(actualEpisodes).to.eql(expectedEpisodes);
    });

    it('should get episode array from episodeRepository and set cache when cache is null', async () => {
        // given
        let expectedEpisodes: EpisodeSearchResult = {
            title: 'Test',
            season: 1,
            totalSeasons: 1,
            data: [episode1, episode2]
        }
        let episodeResult = new Promise((resolve) => resolve(expectedEpisodes));
        let episodeServiceSearchFake = sinon.fake.returns(episodeResult);
        let episodeRepository = getEpisodeRepositoryWith(episodeServiceSearchFake);

        let cacheServiceGetFake = sinon.fake.returns(null);
        let cacheServiceSetSpy = sinon.spy();
        let cacheService = getCacheServiceWith(cacheServiceGetFake, cacheServiceSetSpy);
        let season = 1;

        // when
        let episodeService = new EpisodeService(episodeRepository, cacheService);
        let actualEpisodes = await episodeService.search('Test', season);

        // then
        expect(actualEpisodes).to.eql(expectedEpisodes);
        assert(cacheServiceSetSpy.calledWithExactly('Test', season, expectedEpisodes));
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