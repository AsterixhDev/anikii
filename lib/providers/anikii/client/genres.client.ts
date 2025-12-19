// Genres server-side wrappers
import type { IGenreParams, IGenreQuery } from '../types';
import { getGenres, getGenreAnime } from '../utils/genres';

export async function ssrGetGenres() {
  return getGenres();
}

export async function ssrGetGenreAnime(params: IGenreParams, query: IGenreQuery = {}) {
  return getGenreAnime(params, query);
}
