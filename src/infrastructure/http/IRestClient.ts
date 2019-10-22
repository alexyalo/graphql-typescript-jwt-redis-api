export interface IRestClient {
    get<T>(domain: string, path: string): Promise<T>;
}