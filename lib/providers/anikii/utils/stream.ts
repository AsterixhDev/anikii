// Streaming utilities
import { api, getAxiosErrorMessage } from './axiosInstance';
import type { IStreamEnvelope, IStreamQuery, IStreamParamsBase, IEpisodeParams, IExternalStreamEnvelope, IEpisodeStreamEnvelope, IEpisodeDubEnvelope, IEpisodeExtraEnvelope } from '../types';

// Fetch streaming info for an anime from AniList
export async function getAnimeStreamInfo(params: IStreamParamsBase): Promise<IStreamEnvelope> {
  try {
    const res = await api.get<IStreamEnvelope>(`/anime/${params.id}/stream`);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Fetch external streaming sources parsed from provider
export async function getExternalStream(params: IStreamParamsBase, query: IStreamQuery = {}): Promise<IExternalStreamEnvelope> {
  try {
    const res = await api.get<IExternalStreamEnvelope>(`/anime/${params.id}/stream/external`, { params: query });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Fetch stream data for specific episode
export async function getEpisodeStream(params: IEpisodeParams, query: IStreamQuery = {}): Promise<IEpisodeStreamEnvelope> {
  try {
    const res = await api.get<IEpisodeStreamEnvelope>(`/anime/${params.id}/stream/ep/${params.ep}`, { params: query });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Download original video for episode
export async function downloadEpisodeVideo(params: IEpisodeParams, query: IStreamQuery = {}): Promise<Blob> {
  try {
    const res = await api.get(`/anime/${params.id}/stream/ep/${params.ep}/download`, { params: query, responseType: 'blob' });
    return res.data as Blob;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Live streaming of episode video (m3u8 or similar)
export async function getEpisodeLiveStream(params: IEpisodeParams, query: IStreamQuery = {}): Promise<Blob> {
  try {
    const res = await api.get(`/anime/${params.id}/stream/ep/${params.ep}/live`, { params: query, responseType: 'blob' });
    return res.data as Blob;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Fetch Dub sources for episode
export async function getEpisodeDub(params: IEpisodeParams): Promise<IEpisodeDubEnvelope> {
  try {
    const res = await api.get<IEpisodeDubEnvelope>(`/anime/${params.id}/stream/ep/${params.ep}/dub`);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Fetch extra data for episode including sub/dub lists and thumbnails
export async function getEpisodeExtra(params: IEpisodeParams): Promise<IEpisodeExtraEnvelope> {
  try {
    const res = await api.get<IEpisodeExtraEnvelope>(`/anime/${params.id}/stream/ep/${params.ep}/extra`);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}
