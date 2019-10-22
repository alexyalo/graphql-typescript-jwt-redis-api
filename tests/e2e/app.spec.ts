import { TestEnvironmentInitializer } from "./TestEnvironmentInitializer";
import fetch from 'node-fetch';
import { expect } from 'chai';
import { parse } from "querystring";

describe('Server Integration Test', () => {
    let testEnvironmentInitializer = new TestEnvironmentInitializer();

    beforeEach(() => {
        testEnvironmentInitializer.init();
    });

    afterEach(() => {
        testEnvironmentInitializer.stop();
    });

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
        let testEmail = 'test@test.com';
        
        // when
        let response = await createUser(testEmail, '123456');
        let parsedResponse = await response.json();

        // then
        expect(parsedResponse).to.have.nested.property('data.createUser.id').equals(1);
        expect(parsedResponse).to.have.nested.property('data.createUser.email').equals(testEmail);
        expect(parsedResponse).to.have.nested.property('data.createUser.jwt').not.empty;
    });

    it.only('should return jwt token on login query', async () => {
        // given
        let testEmail = 'test@test.com';
        let password = '123456';
        await createUser(testEmail, password);

        // when
        let response = await login(testEmail, password);
        let parsedResponse = await response.json();
        
        // then
        expect(parsedResponse).to.have.nested.property('data.loginUser.id').equals(1);
        expect(parsedResponse).to.have.nested.property('data.loginUser.email').equals(testEmail);
        expect(parsedResponse).to.have.nested.property('data.loginUser.jwt').not.empty;
    });

    it('should return a movie', async () => {
        // given
        await createUserAndLogin('test@test.com', '123456');
        let query = `query{
            searchMovies(title: 'The Godfather'){
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

    const createUserAndLogin = async (email, password) => {
        await createUser(email, password);
        await login(email, login);
    }

    const login = async (email, password) => {

        let query = `query{
            loginUser(email: "${email}", password: "${password}")
            {
                id
                email,
                jwt
            }
        }`;

        return await fetch('http://localhost:3001/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });
    }
    const createUser = async (email, password) => {
        let query = `mutation{
            createUser(data: { email:"${email}", password:"${password}"}){
              id
              email
              jwt
            }
        }`;

        return await fetch('http://localhost:3001/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });
    }
})