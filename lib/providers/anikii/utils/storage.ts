// Storage utilities: saved list, clear, save file, save tmp and clear tmp
import { api, getAxiosErrorMessage } from './axiosInstance';
import type { IClearSavedEnvelope, IClearSavedQuery, ISaveFileEnvelope, ISaveFileRequestBody, ISaveTmpEnvelope, ISaveTmpParams, ISavedListEnvelope, IClearTmpEnvelope, IClearTmpParams } from '../types';

export async function getSavedList(): Promise<ISavedListEnvelope> {
  try {
    const res = await api.get<ISavedListEnvelope>('/saved');
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

export async function clearSaved(query: IClearSavedQuery = {}): Promise<IClearSavedEnvelope> {
  try {
    const res = await api.delete<IClearSavedEnvelope>('/saved', { params: query });
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

export async function saveFile(body: ISaveFileRequestBody): Promise<ISaveFileEnvelope> {
  try {
    const res = await api.post<ISaveFileEnvelope>('/savefile', body);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

export async function saveTmp(params: ISaveTmpParams): Promise<ISaveTmpEnvelope> {
  try {
    const res = await api.get<ISaveTmpEnvelope>(`/save/${params.name}`);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}

export async function clearTmp(params: IClearTmpParams): Promise<IClearTmpEnvelope> {
  try {
    const res = await api.get<IClearTmpEnvelope>(`/clearTmp/${params.name}`);
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}
