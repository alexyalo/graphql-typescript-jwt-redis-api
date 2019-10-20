import { assert } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { MovieAPI } from '../../src/movie/usecase/MovieAPI';
import { MovieService } from '../../src/movie/domain/MovieService';
import { TestMovieCacheService } from './TestMovieCacheService';
import { TestMovieRepository } from './TestMovieRepository';

describe('MovieAPI Test', () => {
 
  it('should call MovieRepository when a search is done', () => {
    let movieService = new MovieService(new TestMovieRepository(), new TestMovieCacheService());
    let searchSpy = sinon.spy();
    movieService.search = searchSpy;

    let movieAPI = new MovieAPI(movieService);

    movieAPI.getByTitle('The Godfather');
    
    assert(searchSpy.calledWithExactly('The Godfather'));
  });
 
});