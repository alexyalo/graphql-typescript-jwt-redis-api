import testEnvironmentInitializer from "./TestEnvironmentInitializer";
import fetch from 'node-fetch';
import { expect } from 'chai';
import { TestUtils } from "./TestUtils";

const testUtils: TestUtils = new TestUtils(); 

describe('Auth e2e Test', () => {
    before(async () => {
        testEnvironmentInitializer.init();
    });

    after(async () => {
        await testEnvironmentInitializer.stop();
    });

    /* AUTH */
    it('should return Unauthorized 401 http code', async () => {
        // given
        let query = `query{
            getUser{
              id
              email
            }
          }`;

        // when
        let response = await fetch('http://localhost:3001/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });
        let parsedResponse = await response.json();
        
        // then
        expect(parsedResponse).to.have.nested.property('errors[0].message').equals('Unauthorized');
    });

    it('should return jwt token on createUser mutation', async () => {
        // given
        let testEmail = 'test1@test.com';
        let password = '123456';
        
        // when
        let response = await testUtils.createUser(testEmail, password);
        let parsedResponse = await response.json();

        // then
        expect(parsedResponse).to.have.nested.property('data.createUser.id').equals(1);
        expect(parsedResponse).to.have.nested.property('data.createUser.email').equals(testEmail);
        expect(parsedResponse).to.have.nested.property('data.createUser.jwt').not.empty;
    });
    
    it('should return jwt token on login query', async () => {
        // given
        let testEmail = 'test2@test.com';
        let password = '123456';
        
        // when
        let response = await testUtils.createUserAndLogin(testEmail, password);
        let parsedResponse = await response.json();
        
        // then
        expect(parsedResponse).to.have.nested.property('data.loginUser.id').equals(2);
        expect(parsedResponse).to.have.nested.property('data.loginUser.email').equals(testEmail);
        expect(parsedResponse).to.have.nested.property('data.loginUser.jwt').not.empty;
    });

    /* MOVIES */
    it('should return the expected list of movies', async () => {
        // given
        let login = await testUtils.createUserAndLogin('test3@test.com', '123456');
        let loginResponse = await login.json();
     
        let query = `query{
            searchMovies(title: "Godfather", page: 1) 
            {
                totalResults
                data{
                    title
                    imdbID
                    poster
                }
            }
          }`;

        // when
        let response = await fetch('http://localhost:3001/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${loginResponse.data.loginUser.jwt}`
            },
            body: JSON.stringify({ query })
        });
        let parsedResponse = await response.json();
        
        // then
        expect(parsedResponse).to.have.nested.property('data.searchMovies.data[0].title').contains('Godfather');
        
    });

    /* SERIES */
    it('should return the expected list of series', async () => {
        // given
        let login = await testUtils.createUserAndLogin('test3@test.com', '123456');
        let loginResponse = await login.json();
     
        let query = `query{
            searchSeries(title: "Godfather", page: 1) 
            {
                totalResults
                data{
                    title
                    imdbID
                    poster
                }
            }
          }`;

        // when
        let response = await fetch('http://localhost:3001/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${loginResponse.data.loginUser.jwt}`
            },
            body: JSON.stringify({ query })
        });
        let parsedResponse = await response.json();
        
        // then
        expect(parsedResponse).to.have.nested.property('data.searchSeries.data[0].title').contains('Godfather');
        
    });

    /* EPISODES */
    it('should return the expected list of episodes', async () => {
        // given
        let login = await testUtils.createUserAndLogin('test4@test.com', '123456');
        let loginResponse = await login.json();
     
        let query = `query{
            searchEpisodes(title: "Friends", season: 1) 
            {
                title
                totalSeasons
                season
                data{
                    title
                    released
                    episode
                    imdbID
                    imdbRating
                }
            }
          }`;

        // when
        let response = await fetch('http://localhost:3001/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${loginResponse.data.loginUser.jwt}`
            },
            body: JSON.stringify({ query })
        });
        let parsedResponse = await response.json();
        
        // then
        expect(parsedResponse).to.have.nested.property('data.searchEpisodes.season').equals('1');
        expect(parsedResponse).to.have.nested.property('data.searchEpisodes.data[0].episode').equals('1');
    });
})