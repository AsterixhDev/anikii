'use client';

import { useAsync } from './useAsync';
import { ssrGetGenres, ssrGetGenreAnime } from '../client/genres.client';

export function useGenres() {
  return useAsync(() => ssrGetGenres(), []);
}

export function useGenreAnime(genre: string, page?: number) {
  return useAsync(() => ssrGetGenreAnime({ genre }, { page }), [genre, page]);
}
