// Anime entity types
import type { IAnimeDetails, IAnimeItem, IRelationNode, ITrailer } from './api.types';

export interface IAnimeParams {
  id: number;
}

export interface IAnimeDetailsEnvelope {
  status: { code: number; success: boolean; message: string };
  data: IAnimeDetails;
}

export interface IAnimeRelationsEnvelope {
  status: { code: number; success: boolean; message: string };
  data: IRelationNode[];
}

export interface IAnimeTrailersEnvelope {
  status: { code: number; success: boolean; message: string };
  data: { trailer?: ITrailer };
}

export interface IAnimeRecommendedEnvelope {
  status: { code: number; success: boolean; message: string };
  data: IAnimeItem[];
}
