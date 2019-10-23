import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { IMovieRepository } from '../../../src/core/movie/domain/IMovieRepository';
import { OMDBMovieRepository } from '../../../src/core/movie/infrastructure/OMDBMovieRepository';
import { TestHttpClient } from '../../TestHttpClient';
import { Movie } from '../../../src/core/movie/domain/Movie';
import { ApiResponse } from '../../../src/infrastructure/http/ApiResponse';
import { ApiResponseItem } from '../../../src/infrastructure/http/ApiResponseItem';
import { MovieSearchResult } from '../../../src/core/movie/domain/MovieSearchResult';

describe('OMDBMovieRepository Test', () => {

    let movie1: Movie = {
        title: 'The Godfather',
        year: 1980,
        imdbID: "imdbID",
        poster: "test"
    };
    let movie2: Movie = {
        title: 'The Godfather 2',
        year: 1982,
        imdbID: "imdbID",
        poster: "test"
    };

    let responseItem1: ApiResponseItem = {
        Title: 'The Godfather',
        Year: 1980,
        imdbID: "imdbID",
        Poster: "test"
    };
    let responseItem2: ApiResponseItem = {
        Title: 'The Godfather 2',
        Year: 1982,
        imdbID: "imdbID",
        Poster: "test"
    };

    it('should return expected MovieSearchResult when search by title and page', async () => {
        // given
        let httpClient = new TestHttpClient();
        let items: ApiResponseItem[] = [responseItem1, responseItem2];
        let expectedMovies: MovieSearchResult = {
            totalResults: 2,
            data: [movie1, movie2]
        }
        let apiResponse: ApiResponse = {
            Search: items,
            Response: "True",
            totalResults: "2"
        };
        let fakeResponse = sinon.fake.returns(new Promise((resolve) => resolve(apiResponse)));
        httpClient.get = fakeResponse;
        let page = 1;
        
        // when
        let movieRepository: IMovieRepository = new OMDBMovieRepository(httpClient, 'testApiKey');
        let actualResponse = await movieRepository.searchByTitle('The Godfather', page);

        // then
        expect(actualResponse).to.eql(expectedMovies);
    });

});