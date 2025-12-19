// Genres types
import type { IAnimeItem, IPaginationMeta } from './api.types';

export interface IGenresListResponse {
  status: { code: number; success: boolean; message: string };
  data: string[];
}

export interface IGenreQuery {
  page?: number; // default 1
}

export interface IGenreParams {
  genre: string;
}

export interface IGenreResponseMeta {
  pagination: IPaginationMeta;
}

export interface IGenreSuccessEnvelope {
  status: { code: number; success: boolean; message: string };
  meta: { pagination: IGenreResponseMeta['pagination'] };
  data: IAnimeItem[];
}
