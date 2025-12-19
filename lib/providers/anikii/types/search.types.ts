// Search types
import type { IAnimeItem } from './api.types';

export interface ISearchQuery {
  keyword: string;
}

export interface ISearchSuccessEnvelope {
  status: { code: number; success: boolean; message: string };
  data: IAnimeItem[];
}
