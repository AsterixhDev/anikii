// Search utilities
import { api, getAxiosErrorMessage } from './axiosInstance';
import type { ISearchQuery, ISearchSuccessEnvelope } from '../types';

export async function searchAnime(query: ISearchQuery): Promise<ISearchSuccessEnvelope> {
  try {
    const res = await api.get<ISearchSuccessEnvelope>('/search', { params: query });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}
