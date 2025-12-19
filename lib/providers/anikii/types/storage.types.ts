// Saved data and storage types
import type { IClearSavedData, IClearSavedMeta, ISaveFileResponseData, ISavedListData, ISavedListMeta } from './api.types';

export interface ISavedListEnvelope {
  status: { code: number; success: boolean; message: string };
  meta: { saved: ISavedListMeta };
  data: ISavedListData;
}

export interface IClearSavedQuery {
  storage?: 'local' | 'db';
}

export interface IClearSavedEnvelope {
  status: { code: number; success: boolean; message: string };
  meta: { saved: IClearSavedMeta };
  data: IClearSavedData;
}

export interface ISaveFileEnvelope {
  status: { code: number; success: boolean; message: string };
  data: ISaveFileResponseData;
}

export interface ISaveTmpParams {
  name: string; // tmp file name without extension
}

export interface ISaveTmpEnvelope {
  status: { code: number; success: boolean; message: string };
  data: { message: string; files: string };
}

export interface IClearTmpParams {
  name: string; // tmp file name without extension
}

export interface IClearTmpEnvelope {
  status: { code: number; success: boolean; message: string };
  data: { message: string; files: string };
}
