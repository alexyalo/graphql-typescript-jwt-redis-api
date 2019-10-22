import { assert, expect } from 'chai';
import 'mocha';
import sinon from "ts-sinon";

import { MovieService } from '../../src/core/movie/domain/MovieService';
import { IMovieRepository } from '../../src/core/movie/domain/IMovieRepository';
import { Movie } from '../../src/core/movie/domain/Movie';
import { IMovieCacheService } from '../../src/core/movie/domain/IMovieCacheService';
import { TestMovieCacheService } from './TestMovieCacheService';
import { TestMovieRepository } from './TestMovieRepository';

describe('MovieService Test', () => {

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

    it('should call parse and return the movie array from cacheService', async () => {
        // given
        let expectedMovie = [movie1, movie2];
        let movieServiceSearchFake = sinon.stub();
        let movieRepository = getMovieRepositoryWith(movieServiceSearchFake);

        let fakeCacheResponse = new Promise((resolve) => resolve(expectedMovie));
        let cacheServiceGetFake = sinon.fake.returns(fakeCacheResponse);
        let cacheService = getCacheServiceWith(cacheServiceGetFake);

        // when
        let movieService = new MovieService(movieRepository, cacheService);
        let actualMovie = await movieService.search('The Godfather');

        // then
        expect(actualMovie).to.eql(expectedMovie);
    });

    it('should get movie array from movieRepository and set cache when cache is null', async () => {
        // given
        let expectedMovie = [movie1, movie2];
        let movieResult = new Promise((resolve) => resolve(expectedMovie));
        let movieServiceSearchFake = sinon.fake.returns(movieResult);
        let movieRepository = getMovieRepositoryWith(movieServiceSearchFake);

        let cacheServiceGetFake = sinon.fake.returns(null);
        let cacheServiceSetSpy = sinon.spy();
        let cacheService = getCacheServiceWith(cacheServiceGetFake, cacheServiceSetSpy);

        // when
        let movieService = new MovieService(movieRepository, cacheService);
        let actualMovie = await movieService.search('The Godfather');

        // then
        expect(actualMovie).to.eql(expectedMovie);
        assert(cacheServiceSetSpy.calledWithExactly('The Godfather', expectedMovie));
    });

    /* --------------------- */

    function getMovieRepositoryWith(fake: any): IMovieRepository {
        let movieRepository: IMovieRepository = new TestMovieRepository();
        movieRepository.searchByTitle = fake; //movieServiceSearchSpy;

        return movieRepository;
    }

    function getCacheServiceWith(fakeGet: any, fakeSet?: any): IMovieCacheService {
        let cacheService: IMovieCacheService = new TestMovieCacheService();
        cacheService.getByKey = fakeGet;
        cacheService.set = fakeSet;
        return cacheService;
    }

});