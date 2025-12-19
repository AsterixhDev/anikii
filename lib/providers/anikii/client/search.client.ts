// Search server-side wrappers
import type { ISearchQuery } from '../types';
import { searchAnime } from '../utils/search';

export async function ssrSearchAnime(query: ISearchQuery) {
  return searchAnime(query);
}
