'use client';

import { useAsync } from './useAsync';
import { ssrGetAnimeStreamInfo, ssrGetExternalStream, ssrGetEpisodeStream, ssrDownloadEpisodeVideo, ssrGetEpisodeLiveStream, ssrGetEpisodeDub, ssrGetEpisodeExtra } from '../client/stream.client';
import type { IStreamQuery } from '../types';

export function useAnimeStreamInfo(id: number) {
  return useAsync(() => ssrGetAnimeStreamInfo({ id }), [id]);
}

export function useExternalStream(id: number, query: IStreamQuery = {}) {
  const deps = [id, query.type ?? 'sub', query.provider ?? ''];
  return useAsync(() => ssrGetExternalStream({ id }, query), deps);
}

export function useEpisodeStream(id: number, ep: number, query: IStreamQuery = {}) {
  const deps = [id, ep, query.type ?? 'sub', query.provider ?? ''];
  return useAsync(() => ssrGetEpisodeStream({ id, ep }, query), deps);
}

export function useDownloadEpisodeVideo(id: number, ep: number, query: IStreamQuery = {}) {
  const deps = [id, ep, query.type ?? 'sub', query.provider ?? ''];
  return useAsync(() => ssrDownloadEpisodeVideo({ id, ep }, query), deps);
}

export function useEpisodeLiveStream(id: number, ep: number, query: IStreamQuery = {}) {
  const deps = [id, ep, query.type ?? 'sub', query.provider ?? ''];
  return useAsync(() => ssrGetEpisodeLiveStream({ id, ep }, query), deps);
}

export function useEpisodeDub(id: number, ep: number) {
  return useAsync(() => ssrGetEpisodeDub({ id, ep }), [id, ep]);
}

export function useEpisodeExtra(id: number, ep: number) {
  return useAsync(() => ssrGetEpisodeExtra({ id, ep }), [id, ep]);
}