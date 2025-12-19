// FYP utilities
import { api, getAxiosErrorMessage } from './axiosInstance';
import type { IFypEnvelope, IFypQuery, IFypBody } from '../types';

export async function getFyp(body: IFypBody, query: IFypQuery = {}): Promise<IFypEnvelope> {
  try {
    const res = await api.post<IFypEnvelope>(`/fyp`, body, { params: query });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}