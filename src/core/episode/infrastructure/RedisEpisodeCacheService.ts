import { IEpisodeCacheService } from "../domain/IEpisodeCacheService";
import { RedisClient } from "redis";
import { promisify } from "util";
import { EpisodeSearchResult } from "../../episode/domain/EpisodeSearchResult";
import redis from 'redis';

export class RedisEpisodeCacheService implements IEpisodeCacheService {
    client: RedisClient;
    getAsync: any;
    setAsync: any;
    prefix = 'episodes_';
    
    constructor(url: string) {
        this.client = redis.createClient(url);
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
    }

    async set(title: string, page: number, value: EpisodeSearchResult) {
        let key = this.getKey(title, page);
        return await this.client.set(`${key}`, JSON.stringify(value));
    }
    
    async getByKey(title: string, page: number): Promise<EpisodeSearchResult> {
        let key = this.getKey(title, page);
        let value = await this.getAsync(`${key}`);
        return JSON.parse(value) as Promise<EpisodeSearchResult>;
    }

    private getKey(title: string, page: number) {
        let key = this.prefix + title.replace(/ /g,"_");
        key += `_${page};`
        return key;
    }
}