// Catalog server-side wrappers
import type { IPopularQuery, ISeasonParams, ISeasonQuery } from '../types';
import { getPopular, getPopularUpcoming, getPopularReleases, getSeasonReleases, getSeasonYearReleases } from '../utils/catalog';

export async function ssrGetPopular(params: IPopularQuery = {}) {
  return getPopular(params);
}

export async function ssrGetPopularUpcoming(params: IPopularQuery = {}) {
  return getPopularUpcoming(params);
}

export async function ssrGetPopularReleases(params: IPopularQuery = {}) {
  return getPopularReleases(params);
}

export async function ssrGetSeasonReleases(params: ISeasonQuery = {}) {
  return getSeasonReleases(params);
}

export async function ssrGetSeasonYearReleases(path: ISeasonParams, query: ISeasonQuery = {}) {
  return getSeasonYearReleases(path, query);
}
