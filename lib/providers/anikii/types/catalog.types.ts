// Catalog and discovery types: popular, upcoming, releases, seasons
import type { IAnimeItem, IPaginationMeta } from './api.types';

export interface IPopularQuery {
  page?: number; // default 1
}

export interface IPopularResponseMeta {
  pagination: IPaginationMeta;
}

export type IPopularResponseData = IAnimeItem[];

export interface IPopularSuccessEnvelope {
  status: { code: number; success: boolean; message: string };
  meta: { pagination: IPopularResponseMeta['pagination'] };
  data: IPopularResponseData;
}

export interface ISeasonQuery {
  page?: number; // default 1
}

export interface ISeasonParams {
  season: string; // WINTER | SPRING | SUMMER | FALL
  year: number;
}
