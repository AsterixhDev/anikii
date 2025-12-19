// Storage server-side wrappers
import type { IClearSavedQuery, ISaveFileRequestBody, ISaveTmpParams, IClearTmpParams } from '../types';
import { getSavedList, clearSaved, saveFile, saveTmp, clearTmp } from '../utils/storage';

export async function ssrGetSavedList() {
  return getSavedList();
}

export async function ssrClearSaved(query: IClearSavedQuery = {}) {
  return clearSaved(query);
}

export async function ssrSaveFile(body: ISaveFileRequestBody) {
  return saveFile(body);
}

export async function ssrSaveTmp(params: ISaveTmpParams) {
  return saveTmp(params);
}

export async function ssrClearTmp(params: IClearTmpParams) {
  return clearTmp(params);
}
