// FYP server-side wrappers
import type { IFypBody, IFypQuery } from '../types';
import { getFyp } from '../utils/fyp';

export async function ssrGetFyp(body: IFypBody, query: IFypQuery = {}) {
  return getFyp(body, query);
}
