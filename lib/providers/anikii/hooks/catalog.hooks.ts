'use client';

import { useAsync } from './useAsync';
import { ssrGetPopular, ssrGetPopularUpcoming, ssrGetPopularReleases, ssrGetSeasonReleases, ssrGetSeasonYearReleases } from '../client/catalog.client';
import type { IPopularQuery, ISeasonParams, ISeasonQuery } from '../types';

export function usePopular(params: IPopularQuery = {}) {
  return useAsync(() => ssrGetPopular(params), [params.page ?? 1]);
}

export function usePopularUpcoming(params: IPopularQuery = {}) {
  return useAsync(() => ssrGetPopularUpcoming(params), [params.page ?? 1]);
}

export function usePopularReleases(params: IPopularQuery = {}) {
  return useAsync(() => ssrGetPopularReleases(params), [params.page ?? 1]);
}

export function useSeasonReleases(params: ISeasonQuery = {}) {
  return useAsync(() => ssrGetSeasonReleases(params), [params.page ?? 1]);
}

export function useSeasonYearReleases(path: ISeasonParams, query: ISeasonQuery = {}) {
  const deps = [path.season, path.year, query.page ?? 1];
  return useAsync(() => ssrGetSeasonYearReleases(path, query), deps);
}