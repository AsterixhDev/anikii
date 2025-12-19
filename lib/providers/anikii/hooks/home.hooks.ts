'use client';

import { useAsync } from './useAsync';
import { ssrGetPopular, ssrGetPopularReleases, ssrGetPopularUpcoming } from '../client/catalog.client';

export interface HomeData {
  popular: any;
  releases: any;
  upcoming: any;
}

export function useHomeData() {
  return useAsync(async (): Promise<HomeData> => {
    const [popular, releases, upcoming] = await Promise.all([
      ssrGetPopular({ page: 1 }),
      ssrGetPopularReleases({ page: 1 }),
      ssrGetPopularUpcoming({ page: 1 })
    ]);

    return { popular, releases, upcoming };
  }, []);
}