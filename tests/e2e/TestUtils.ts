import fetch from 'node-fetch';

export class TestUtils {
    async createUserAndLogin(email, password) {
        await this.createUser(email, password);
        return await this.login(email, password);
    }

    async createUser(email, password) {
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

    async login(email, password) {
        let query = `query{
            loginUser(email: "${email}", password: "${password}")
            {
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
}