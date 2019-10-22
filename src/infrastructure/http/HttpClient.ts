import { IRestClient } from "./IRestClient";
import fetch from 'node-fetch';

export class HttpClient implements IRestClient {

    async get<T>(domain: string, path: string): Promise<T> {
        let response = await fetch(`${domain}${path}`, {
            method: 'get'
        });
        
        return response.json() as Promise<T>
    }
}