// Stream-related types
import type { IStreamingInfo, IEpisodeStreamData, IStreamExtra } from './api.types';

export interface IStreamParamsBase {
  id: number;
}

export interface IEpisodeParams extends IStreamParamsBase {
  ep: number;
}

export interface IStreamQuery {
  type?: 'sub' | 'dub';
  provider?: string;
}

export interface IStreamEnvelope {
  status: { code: number; success: boolean; message: string };
  data: unknown; // general stream info from AniList
}

export interface IExternalStreamEnvelope {
  status: { code: number; success: boolean; message: string };
  data: IStreamingInfo;
}

export interface IEpisodeStreamEnvelope {
  status: { code: number; success: boolean; message: string };
  data: IEpisodeStreamData;
}

export interface IEpisodeDubEnvelope {
  status: { code: number; success: boolean; message: string };
  data: IStreamingInfo;
}

export interface IEpisodeExtraEnvelope {
  status: { code: number; success: boolean; message: string };
  data: IStreamExtra;
}
