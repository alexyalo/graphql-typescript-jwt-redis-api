import { assert } from 'chai';
import 'mocha';
import sinon from 'sinon';

import { MovieAPI } from '../../src/core/movie/usecase/MovieAPI';
import { MovieService } from '../../src/core/movie/domain/MovieService';
import { TestMovieCacheService } from './TestMovieCacheService';
import { TestMovieRepository } from './TestMovieRepository';

describe('MovieAPI Test', () => {
 
  it('should call MovieRepository when a search is done', () => {
    let movieService = new MovieService(new TestMovieRepository(), new TestMovieCacheService());
    let searchSpy = sinon.spy();
    movieService.search = searchSpy;

    let movieAPI = new MovieAPI(movieService);
    let page = 1;
    
    movieAPI.getByTitle('The Godfather', page);
    
    assert(searchSpy.calledWithExactly('The Godfather', page));
  });
 
});