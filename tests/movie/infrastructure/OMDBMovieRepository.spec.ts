import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { IMovieRepository } from '../../../src/movie/domain/IMovieRepository';
import { OMDBMovieRepository } from '../../../src/movie/infrastructure/OMDBMovieRepository';
import { TestHttpClient } from '../../TestHttpClient';
import { Movie } from '../../../src/movie/domain/Movie';
import { ApiResponse } from '../../../src/external/ApiResponse';

describe('OMDBMovieRepository Test', () => {

    let movie1: Movie = {
        title: 'The Godfather',
        year: 1980,
        imdbID: "imdbID",
        type: "movie",
        poster: "test"
    };
    let movie2: Movie = {
        title: 'The Godfather 2',
        year: 1982,
        imdbID: "imdbID",
        type: "movie",
        poster: "test"
    };

    it('should return an array of Movie when search by title', async () => {
        // given
        let httpClient = new TestHttpClient();
        let movies = [movie1, movie2];
        let apiResponse: ApiResponse<Movie[]> = {
            Search: movies 
        };
        let fakeResponse = sinon.fake.returns(new Promise((resolve) => resolve(apiResponse)));
        httpClient.get = fakeResponse;
        
        // when
        let movieRepository: IMovieRepository = new OMDBMovieRepository(httpClient);
        let actualResponse = await movieRepository.searchByTitle('The Godfather');

        // then
        expect(actualResponse).to.eql(movies);
    });

});