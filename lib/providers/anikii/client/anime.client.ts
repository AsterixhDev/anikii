// Anime server-side wrappers
import type { IAnimeParams } from '../types';
import { getAnimeDetails, getAnimeRelations, getAnimeTrailers, getAnimeRecommended } from '../utils/anime';

export async function ssrGetAnimeDetails(params: IAnimeParams) {
  return getAnimeDetails(params);
}

export async function ssrGetAnimeRelations(params: IAnimeParams) {
  return getAnimeRelations(params);
}

export async function ssrGetAnimeTrailers(params: IAnimeParams) {
  return getAnimeTrailers(params);
}

export async function ssrGetAnimeRecommended(params: IAnimeParams) {
  return getAnimeRecommended(params);
}
