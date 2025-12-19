// FYP (For You Page) types
import type { IFypMeta, IFypRecommendation } from './api.types';

export interface IFypQuery {
  page?: number;
}

export interface IFypBody {
  collection: number[];
}

export interface IFypEnvelope {
  status: { code: number; success: boolean; message: string };
  meta: { fyp: IFypMeta };
  data: IFypRecommendation[];
}
