# GraphQL API Challenge

This is a Dockerized GraphQL API built with Typescript and designed with the following concepts in mind:
* Clean Architecture
* Clean Code
* SOLID Principles
* TDD

## What you can do
Users of this API have the ability of signing up for a JWT that will grant them access to search for movies, series and episodes in the OMDBApi external service.
OMDBApi results are cached in a redis instance and fetched from there in successive requests for faster results.

## How to build
Clone this repository and go to a terminal and run this command
```
$ docker-compose build && docker-compose up
```
This will generate 3 containers:
* API
* MySQL DB (Used for user persistence and JWT authentication)
* Redis (Used for caching search results)

After starting the docker containers you should see a message like "Server ready at...." and "Connected to the database". That means everything is ready.

### Playground
Now you can go to the GraphQL playground and test the service. If you haven't changed the PORT in .env file, then the url will be http://localhost:4001/graphql

# Tests
In the tests folder you will see there are e2e tests that verify the Apollo Server integration works from end to end, and also specific Unit Tests for core functionality.

## Run Tests inside the API Docker Container
You can see your running containers with the command
```
$ docker ps
```
Now you can enter the container running a command like this
```
$ docker exec -it {API_CONTAINER_NAME} /bin/bash
```
Replace {API_CONTAINER_NAME} with the API container name.

Now run
```
$ npm run test
```

## Run Tests on your host machine
If you want to run the tests in your host machine instead of inside the Docker then folow this.
This project was built in the LTS Node version 10.16.3, so please use `nvm` to switch your node version to this.
Then go to the root folder of the project and run this
```
$ npm install
$ npm run test
```

If you have any issue when building sqlite3 or bcrypt binaries you will need to install node-gyp, python and gcc commands. Running the tests inside the Docker container is preferable.

## JWT
All queries performed (except for loginUser and mutation createUser) must have the Authorization HTTP Header with a value of type "Bearer {jwtToken}".
In the playground go to HTTP Headers and set this
```
{
  "Authorization": "Bearer {YOUR_JWT_TOKEN}"
}
```
Replace {YOUR_JWT_TOKEN} with your actual token you got in login or createUser.

## ENV
For the purposes of this challenge the .env files are not ignored as they should be in a real world project.

# Examples

### Authentication
Create a User and get JWT token
```
mutation{
    createUser(data: { email:"your@email.com", password:"yourpassword"}){
        id
        email
        jwt
    }
}
```

Login with your user
```
query{
    loginUser(email: "${email}", password: "${password}")
    {
        id
        email
        jwt
    }
}
```

### Movies
```
query{
    searchMovies(title: "Godfather", page: 1) 
    {
        totalResults
        data{
            title
            imdbID
            poster
            year
        }
    }
}
```

### Series
```
query{
    searchSeries(title: "Friends", page: 1) 
    {
        totalResults
        data{
            title
            imdbID
            poster
            year
        }
    }
}
```

### Episodes
In this query, you have to specify the title of the series and the season number and the API will return the episodes in that series season.
```
query{
    searchEpisodes(title: "Friends", season: 1) 
    {
        title
        season
        totalSeasons
        data{
            title
            released
            episode
            imdbRating
            imdbID
        }
    }
}
```