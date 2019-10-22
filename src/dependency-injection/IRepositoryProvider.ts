import { IMovieRepository } from "../core/movie/domain/IMovieRepository";

export interface IRepositoryProvider {
    getMovieRepository(): IMovieRepository;
}