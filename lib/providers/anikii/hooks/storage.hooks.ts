'use client';

import { useAsync } from './useAsync';
import { ssrGetSavedList } from '../client/storage.client';

export function useSavedList() {
  return useAsync(() => ssrGetSavedList(), []);
}
