import { IMovieCacheService } from "../domain/IMovieCacheService";
import { MovieSearchResult } from "../domain/MovieSearchResult";
import redis, { RedisClient } from 'redis';
import { promisify } from "util";

export class RedisMovieCacheService implements IMovieCacheService {

    client: RedisClient;
    getAsync: any;
    setAsync: any;
    prefix = 'movies_';
    
    constructor(url: string) {
        this.client = redis.createClient(url);
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
    }

    async set(title: string, page: number, value: MovieSearchResult) {
        let key = this.getKey(title, page);
        return await this.client.set(`${key}`, JSON.stringify(value));
    }
    
    async getByKey(title: string, page: number): Promise<MovieSearchResult> {
        let key = this.getKey(title, page);
        let value = await this.getAsync(`${key}`);
        return JSON.parse(value) as Promise<MovieSearchResult>;
    }

    private getKey(title: string, page: number) {
        let key = this.prefix + title.replace(/ /g,"_");
        key += `_${page};`
        return key;
    }
}