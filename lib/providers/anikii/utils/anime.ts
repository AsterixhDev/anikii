// Anime entity utilities
import { api, getAxiosErrorMessage } from './axiosInstance';
import type { IAnimeDetailsEnvelope, IAnimeParams, IAnimeRelationsEnvelope, IAnimeTrailersEnvelope, IAnimeRecommendedEnvelope } from '../types';

export async function getAnimeDetails(params: IAnimeParams): Promise<IAnimeDetailsEnvelope> {
  try {
    const res = await api.get<IAnimeDetailsEnvelope>(`/anime/${params.id}`);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

export async function getAnimeRelations(params: IAnimeParams): Promise<IAnimeRelationsEnvelope> {
  try {
    const res = await api.get<IAnimeRelationsEnvelope>(`/anime/${params.id}/relations`);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

export async function getAnimeTrailers(params: IAnimeParams): Promise<IAnimeTrailersEnvelope> {
  try {
    const res = await api.get<IAnimeTrailersEnvelope>(`/anime/${params.id}/trailers`);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

export async function getAnimeRecommended(params: IAnimeParams): Promise<IAnimeRecommendedEnvelope> {
  try {
    const res = await api.get<IAnimeRecommendedEnvelope>(`/anime/${params.id}/recommended`);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}
