// Common API envelope and shared models for the Anikii backend

export interface IApiStatus {
  code: number;
  success: boolean;
  message: string;
}

export interface IApiRequestInfo {
  id?: string;
  timestamp?: string; // ISO-8601
  method?: string; // GET | POST | DELETE | PUT
  path?: string;
  query?: Record<string, unknown>;
}

export interface IApiSuccessEnvelope<TData> {
  status: IApiStatus;
  request?: IApiRequestInfo;
  meta?: Record<string, unknown>;
  data: TData;
}

export interface IApiErrorEnvelope {
  status: IApiStatus;
  request?: IApiRequestInfo;
  meta?: Record<string, unknown>;
  data: null;
  error?: unknown;
}

// Reusable pagination meta shape
export interface IPaginationMeta {
  currentPage: number;
  lastPage: number;
}

// Cover image model inspired by app/models/responses.py and structure outputs
export interface ICoverImage {
  extraLarge?: string;
  large?: string;
  medium?: string;
  color?: string | null;
  cover_image?: string; // some routes expose simplified name
  cover_image_color?: string | null;
  cover_image_url?: string;
}

export interface IAnimeTitle {
  romaji?: string | null;
  english?: string | null;
  native?: string | null;
}

export interface IAnimeSeason {
  type?: string | null;
  year: number;
}

export interface IAnimeItem {
  id: number;
  title: string;
  coverImage?: ICoverImage;
  bannerImage?: string | null;
  format?: string | null;
  status?: string | null;
  episodes?: number | null;
  duration?: number | null;
  season?: string | null;
  seasonYear?: number | null;
  popularity?: number | null;
  genres?: string[];
  seasonObject?: IAnimeSeason | null;
}

export interface IPageInfo {
  total?: number;
  perPage?: number;
  currentPage?: number;
  lastPage?: number;
  hasNextPage?: boolean;
}

export interface IPagedResponse<T> {
  pageInfo?: IPageInfo;
  items: T[];
}

// Trailer and relations structures
export interface ITrailer {
  id?: string;
  site?: string; // youtube, etc.
  thumbnail?: string | null;
}

export interface IRelationNode {
  id: number;
  title: IAnimeTitle;
  relationType?: string | null;
  format?: string | null;
  coverImage?: ICoverImage;
}

export interface IAnimeDetails extends Omit<IAnimeItem, 'title'> {
  title: IAnimeTitle | string;
  description?: string | null;
  startDate?: { year?: number; month?: number; day?: number } | null;
  endDate?: { year?: number; month?: number; day?: number } | null;
  averageScore?: number | null;
  studios?: string[];
  synonyms?: string[];
  releaseDate?: number;
  seasonObject?: IAnimeSeason | null;
  trending?: number;
  type?: string;
  tags?: Array<{rank: number; id: number; name: string; description: string; category: string}>;
  score_distribution?: Array<{score: number; amount: number}>;
  anime_id_ext?: {idGogo: string; idGogoDub: string; idZoro: string; idPahe: string};
  anikii_id_eng?: string;
  anikii_id_rom?: string;
  anikii_ids?: string[];
  nextAiringEpisode?: any;
}

// Streaming related types
export interface IStreamSource {
  name: string;
  url: string;
  quality?: string;
  isM3U8?: boolean;
}

export interface IStreamingInfo {
  sources: IStreamSource[];
  subtitles?: Array<{ lang: string; url: string }>;
}

export interface IEpisodeInfo {
  title?: string;
  number?: number;
  airedAt?: string | null;
}

export interface IEpisodeStreamData {
  episode_info?: IEpisodeInfo;
  stream_links?: IStreamSource[];
}

export interface IStreamExtra {
  episodesSub?: Record<string, unknown>;
  episodesDub?: Record<string, unknown>;
  animeInfo?: {
    title?: string;
    thumbnail?: string;
    episodes?: { currentEpisode?: number; lastEpisode?: number };
  };
}

// Saved / storage types
export interface ISavedListMeta {
  local_count: number;
  db_count: number;
}

export interface ISavedListData {
  message: string;
  files: { local: string[]; db: string[] };
}

export interface IClearSavedMeta {
  storage: 'local' | 'db';
  cleared_count: number;
}

export interface IClearSavedData {
  message: string;
  files: string[] | Record<string, never>;
}

export interface ISaveFileRequestBody {
  name: string;
  data: unknown; // arbitrary json
}

export interface ISaveFileResponseData {
  message: string;
  data: { name: string; content: unknown };
}

// FYP types
export type IFypRecommendation = IAnimeItem

export interface IFypMeta {
  count: number;
  ids: string[];
  page: number;
}