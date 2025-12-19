'use client';

import { useAsync } from './useAsync';
import { ssrGetFyp } from '../client/fyp.client';
import type { IFypBody, IFypQuery } from '../types';

export function useFyp(body: IFypBody, query: IFypQuery = {}) {
  // Depend on body.collection and query.page for memoization
  const deps = [JSON.stringify(body?.collection ?? []), query?.page ?? 1];
  return useAsync(() => ssrGetFyp(body, query), deps);
}