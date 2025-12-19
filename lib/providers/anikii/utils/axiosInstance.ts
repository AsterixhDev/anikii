import axios from 'axios';

// Centralized Axios instance for Anikii API
// NEXT_PUBLIC_API_BASE_URL can be set to the deployed base URL.
export const api = axios.create({
  baseURL: "https://api-anikii.onrender.com",
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to extract a clean error message from any Axios error
export function getAxiosErrorMessage(err: unknown): string {
  if (!err) return 'Unknown error';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const e = err as any;
  if (e.response?.data?.status?.message) return String(e.response.data.status.message);
  if (e.message) return String(e.message);
  return 'Request failed';
}
