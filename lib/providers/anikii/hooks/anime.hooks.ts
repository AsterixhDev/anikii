'use client';

import { useAsync } from './useAsync';
import { ssrGetAnimeDetails, ssrGetAnimeRelations, ssrGetAnimeTrailers, ssrGetAnimeRecommended } from '../client/anime.client';

export function useAnimeDetails(id: number) {
  return useAsync(() => ssrGetAnimeDetails({ id }), [id]);
}

export function useAnimeRelations(id: number) {
  return useAsync(() => ssrGetAnimeRelations({ id }), [id]);
}

export function useAnimeTrailers(id: number) {
  return useAsync(() => ssrGetAnimeTrailers({ id }), [id]);
}

export function useAnimeRecommended(id: number) {
  return useAsync(() => ssrGetAnimeRecommended({ id }), [id]);
}
