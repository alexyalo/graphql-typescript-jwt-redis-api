import express from 'express';
import jwt from 'express-jwt';
import { ApolloServer } from 'apollo-server-express';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';

import { sequelize } from './infrastructure/sequelize/models';
import { resolver as resolvers, schema, schemaDirectives } from './delivery';
import { IDataSourceProvider } from './dependency-injection/IDataSourceProvider';
import { Environment } from './environment';

export class App {

    constructor(private dataSourceProvider: IDataSourceProvider, private environment: Environment){}

    public init(): ApolloServer {
        let app = express();

        app.use(this.getAuthMiddleware());

        app.use(this.onExpressError);

        let server = this.getApolloServer();

        server.applyMiddleware({ app });

        app.listen({ port: this.environment.port }, this.onExpressReady(server));

        return server;
    }

    private onExpressReady(server: ApolloServer) {
        return async () => {
            console.log(`🚀 Server ready at http://localhost:${this.environment.port}${server.graphqlPath}`);

            try {
                await sequelize.sync();
                console.error('🍕 Connected to the database');
            } catch (err) {
                console.error('❌ Error: Cannot connect to database');
            }
        };
    }

    private onExpressError(err, req, res, next) {
        const errorObject = { error: true, message: `${err.name}: ${err.message}` };

        if (err.name === 'UnauthorizedError') {
            return res.status(401).json(errorObject);
        } else {
            return res.status(400).json(errorObject);
        }
    }

    private getApolloServer(): ApolloServer {
        return new ApolloServer({
            typeDefs: schema,
            resolvers,
            dataSources: () => ({ 
                movieDataSource: this.dataSourceProvider.getMovieDataSource()
            }),
            schemaDirectives,
            introspection: this.environment.apollo.introspection,
            playground: this.environment.apollo.playground,
            context: ({ req }) => {
                let nreq = <any>req;
                let user = nreq.user;
                return {
                    [EXPECTED_OPTIONS_KEY]: createContext(sequelize),
                    user: user,
                };
            }
        });
    }

    private getAuthMiddleware() {
        return jwt({
            secret: this.environment.jwtEncryption,
            credentialsRequired: false,
        });
    }
}