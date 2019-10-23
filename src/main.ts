import { resolve } from "path";
import { config } from "dotenv";
config({ path: resolve(__dirname, "../.env") });

import { environment } from './environment';
import { App } from './app';
import { UseCaseProvider } from "./dependency-injection/UseCaseProvider";
import { ServiceProvider } from "./dependency-injection/ServiceProvider";
import { RepositoryProvider } from "./dependency-injection/RepositoryProvider";
import { HttpClient } from "./infrastructure/http/HttpClient";
import { CacheServiceProvider } from "./dependency-injection/CacheServiceProvider";
import { DataSourceProvider } from "./dependency-injection/DataSourceProvider";

let httpClient = new HttpClient();
let repositoryProvider = new RepositoryProvider(httpClient, environment);
let cacheServiceProvider = new CacheServiceProvider(environment);
let serviceProvider = new ServiceProvider(repositoryProvider, cacheServiceProvider);
let useCaseProvider = new UseCaseProvider(serviceProvider);
let dataSourceProvider = new DataSourceProvider(useCaseProvider);

let app = new App(dataSourceProvider, environment);
app.init();