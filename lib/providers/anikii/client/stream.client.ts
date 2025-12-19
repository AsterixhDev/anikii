// Stream server-side wrappers
import type { IStreamParamsBase, IEpisodeParams, IStreamQuery } from '../types';
import { getAnimeStreamInfo, getExternalStream, getEpisodeStream, downloadEpisodeVideo, getEpisodeLiveStream, getEpisodeDub, getEpisodeExtra } from '../utils/stream';

export async function ssrGetAnimeStreamInfo(params: IStreamParamsBase) {
  return getAnimeStreamInfo(params);
}

export async function ssrGetExternalStream(params: IStreamParamsBase, query: IStreamQuery = {}) {
  return getExternalStream(params, query);
}

export async function ssrGetEpisodeStream(params: IEpisodeParams, query: IStreamQuery = {}) {
  return getEpisodeStream(params, query);
}

export async function ssrDownloadEpisodeVideo(params: IEpisodeParams, query: IStreamQuery = {}) {
  return downloadEpisodeVideo(params, query);
}

export async function ssrGetEpisodeLiveStream(params: IEpisodeParams, query: IStreamQuery = {}) {
  return getEpisodeLiveStream(params, query);
}

export async function ssrGetEpisodeDub(params: IEpisodeParams) {
  return getEpisodeDub(params);
}

export async function ssrGetEpisodeExtra(params: IEpisodeParams) {
  return getEpisodeExtra(params);
}
