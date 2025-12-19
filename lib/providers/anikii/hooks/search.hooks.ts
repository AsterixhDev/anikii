'use client';

import { useAsync } from './useAsync';
import { ssrSearchAnime } from '../client/search.client';

export function useSearch(keyword: string) {
  return useAsync(() => ssrSearchAnime({ keyword }), [keyword]);
}
