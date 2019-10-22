import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { IEpisodeRepository } from '../../../src/core/episode/domain/IEpisodeRepository';
import { OMDBEpisodeRepository } from '../../../src/core/episode/infrastructure/OMDBEpisodeRepository';
import { TestHttpClient } from '../../TestHttpClient';
import { Episode } from '../../../src/core/episode/domain/Episode';
import { ApiResponse } from '../../../src/infrastructure/http/ApiResponse';

describe('OMDBEpisodeRepository Test', () => {

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

    it('should return an array of Episode when search by title', async () => {
        // given
        let httpClient = new TestHttpClient();
        let episodes = [episode1, episode2];
        let apiResponse: ApiResponse<Episode[]> = {
            Search: episodes 
        };
        let fakeResponse = sinon.fake.returns(new Promise((resolve) => resolve(apiResponse)));
        httpClient.get = fakeResponse;
        
        // when
        let episodeRepository: IEpisodeRepository = new OMDBEpisodeRepository(httpClient);
        let actualResponse = await episodeRepository.searchByTitle('Test');

        // then
        expect(actualResponse).to.eql(episodes);
    });

});