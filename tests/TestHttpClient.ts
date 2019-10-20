import { IRestClient } from "../src/external/IRestClient";

export class TestHttpClient implements IRestClient {
    get<T>(domain: string, path: string): T {
        throw new Error("Method not implemented.");
    }
}