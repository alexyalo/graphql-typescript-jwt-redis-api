import { ISeriesCacheService } from "../domain/ISeriesCacheService";
import { SeriesSearchResult } from "../domain/SeriesSearchResult";
import { RedisClient } from "redis";
import { promisify } from "util";
import redis from 'redis';

export class RedisSeriesCacheService implements ISeriesCacheService {
    client: RedisClient;
    getAsync: any;
    setAsync: any;
    prefix = 'series_';
    
    constructor(url: string) {
        this.client = redis.createClient(url);
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
    }

    async set(title: string, page: number, value: SeriesSearchResult) {
        let key = this.getKey(title, page);
        return await this.client.set(`${key}`, JSON.stringify(value));
    }
    
    async getByKey(title: string, page: number): Promise<SeriesSearchResult> {
        let key = this.getKey(title, page);
        let value = await this.getAsync(`${key}`);
        return JSON.parse(value) as Promise<SeriesSearchResult>;
    }

    private getKey(title: string, page: number) {
        let key = this.prefix + title.replace(/ /g,"_");
        key += `_${page};`
        return key;
    }


}