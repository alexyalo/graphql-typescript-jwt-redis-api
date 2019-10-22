import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../.env") });

import { App } from '../../src/app';
import { ApolloServer } from "apollo-server-express";

export class TestEnvironmentInitializer {
    private server: ApolloServer;
    init() {
        let app = new App();
        this.server = app.init();
    }

    stop() {
        this.server.stop();
    }
}