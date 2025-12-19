// Home server-side wrapper
import { getHome } from '../utils/home';

export async function ssrGetHome() {
  return getHome();
}
