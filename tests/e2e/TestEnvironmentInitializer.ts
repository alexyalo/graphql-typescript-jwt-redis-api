import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../.env") });

import { App } from '../../src/app';
import { ApolloServer } from "apollo-server-express";
import { RepositoryProvider } from "../../src/dependency-injection/RepositoryProvider";
import { environment } from "../../src/environment";
import { CacheServiceProvider } from "../../src/dependency-injection/CacheServiceProvider";
import { ServiceProvider } from "../../src/dependency-injection/ServiceProvider";
import { UseCaseProvider } from "../../src/dependency-injection/UseCaseProvider";
import { DataSourceProvider } from "../../src/dependency-injection/DataSourceProvider";
import { HttpClient } from "../../src/infrastructure/http/HttpClient";

class TestEnvironmentInitializer {
    private server: ApolloServer;
    
    async init() {
        if (this.server) {
            await this.server.stop();
        }

        let httpClient = new HttpClient();
        let repositoryProvider = new RepositoryProvider(httpClient, environment);
        let cacheServiceProvider = new CacheServiceProvider(environment);
        let serviceProvider = new ServiceProvider(repositoryProvider, cacheServiceProvider);
        let useCaseProvider = new UseCaseProvider(serviceProvider);
        let dataSourceProvider = new DataSourceProvider(useCaseProvider);

        let app = new App(dataSourceProvider, environment);
        
        this.server = app.init();
    }

    async stop() {
        await this.server.stop();
    }
}

export default new TestEnvironmentInitializer();