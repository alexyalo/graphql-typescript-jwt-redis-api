import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { IEpisodeRepository } from '../../../src/core/episode/domain/IEpisodeRepository';
import { OMDBEpisodeRepository } from '../../../src/core/episode/infrastructure/OMDBEpisodeRepository';
import { TestHttpClient } from '../../TestHttpClient';
import { Episode } from '../../../src/core/episode/domain/Episode';
import { SeasonEpisodeApiResponse, SeasonApiResponse } from '../../../src/core/episode/infrastructure/SeasonApiResponse';
import { EpisodeSearchResult } from '../../../src/core/episode/domain/EpisodeSearchResult';

describe('OMDBEpisodeRepository Test', () => {

    let episode1: Episode = {
        title: 'Test Episode 1',
        imdbID: 'imdbID',
        released: '1994-02-2',
        episode: 1,
        imdbRating: 10
    };
    let episode2: Episode = {
        title: 'Test Episode 2',
        imdbID: 'imdbID',
        released: '1994-02-2',
        episode: 1,
        imdbRating: 10
    };

    let responseItem1: SeasonEpisodeApiResponse = {
        Title: 'Test Episode 1',
        Released: '1994-02-2',
        Episode: '1',
        imdbRating: '10', 
        imdbID: 'imdbID',
    };
    let responseItem2: SeasonEpisodeApiResponse = {
        Title: 'Test Episode 2',
        Released: '1994-02-2',
        Episode: '1',
        imdbRating: '10', 
        imdbID: 'imdbID',
    };

    it('should return expected EpisodeSearchResult when search by title and season', async () => {
        // given
        let httpClient = new TestHttpClient();
        let items: SeasonEpisodeApiResponse[] = [responseItem1, responseItem2]
        let episodes: EpisodeSearchResult = {
            title: 'Test',
            season: 1,
            totalSeasons: 2,
            data: [episode1, episode2]
        }

        let apiResponse: SeasonApiResponse = {
            Title: 'Test',
            Season: '1',
            totalSeasons: '2',
            Episodes: items,
        };
        let fakeResponse = sinon.fake.returns(new Promise((resolve) => resolve(apiResponse)));
        httpClient.get = fakeResponse;
        let season = 1;
        
        // when
        let episodeRepository: IEpisodeRepository = new OMDBEpisodeRepository(httpClient, 'testApiKey');
        let actualResponse = await episodeRepository.searchByTitle('Test', season);

        // then
        expect(actualResponse).to.eql(episodes);
    });

});