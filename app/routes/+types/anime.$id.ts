import type { IAnimeDetails } from '../../../lib/providers/anikii/types/api.types';

export interface Route {
  params: {
    id: string;
  };
  data?: {
    anime: IAnimeDetails;
  };
  error?: string;
}