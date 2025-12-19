// Home utilities
import { api, getAxiosErrorMessage } from './axiosInstance';

export interface IHomeEnvelope {
  status: { code: number; success: boolean; message: string };
  data: {
    message: string[];
    terms_of_use: string[];
    endpoints: Array<{ endpoint: string; description: string }>;
    liveurl: string;
  };
}

export async function getHome(): Promise<IHomeEnvelope> {
  try {
    const res = await api.get<IHomeEnvelope>('/');
    return res.data;
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err));
  }
}
