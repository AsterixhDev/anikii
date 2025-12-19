// Catalog utilities: popular, upcoming, releases, seasons
import { api, getAxiosErrorMessage } from './axiosInstance';
import type { IPopularQuery, IPopularSuccessEnvelope, ISeasonParams, ISeasonQuery } from '../types';

// Fetch popular anime
export async function getPopular(params: IPopularQuery = {}): Promise<IPopularSuccessEnvelope> {
  try {
    const res = await api.get<IPopularSuccessEnvelope>('/popular', { params });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Fetch upcoming popular anime
export async function getPopularUpcoming(params: IPopularQuery = {}): Promise<IPopularSuccessEnvelope> {
  try {
    const res = await api.get<IPopularSuccessEnvelope>('/popular/upcoming', { params });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Fetch popular releases
export async function getPopularReleases(params: IPopularQuery = {}): Promise<IPopularSuccessEnvelope> {
  try {
    const res = await api.get<IPopularSuccessEnvelope>('/popular/releases', { params });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Fetch current season releases
export async function getSeasonReleases(params: ISeasonQuery = {}): Promise<IPopularSuccessEnvelope> {
  try {
    const res = await api.get<IPopularSuccessEnvelope>('/popular/releases/seasons', { params });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Fetch releases for specific season and year
export async function getSeasonYearReleases(
  pathParams: ISeasonParams,
  query: ISeasonQuery = {},
): Promise<IPopularSuccessEnvelope> {
  try {
    const { season, year } = pathParams;
    const res = await api.get<IPopularSuccessEnvelope>(`/popular/releases/seasons/${season}/${year}`, { params: query });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}
