// Genres utilities
import { api, getAxiosErrorMessage } from './axiosInstance';
import type { IGenreParams, IGenreQuery, IGenreSuccessEnvelope, IGenresListResponse } from '../types';

// Fetch all genres
export async function getGenres(): Promise<IGenresListResponse> {
  try {
    const res = await api.get<IGenresListResponse>('/genres');
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

// Fetch anime by specific genre
export async function getGenreAnime(params: IGenreParams, query: IGenreQuery = {}): Promise<IGenreSuccessEnvelope> {
  try {
    const res = await api.get<IGenreSuccessEnvelope>(`/genres/${params.genre}`, { params: query });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}
