import type { IAnimeItem } from '../types/anime';

// Sample featured anime data for demonstration
export const sampleFeaturedAnime: IAnimeItem[] = [
  {
    id: 1,
    title: {
      romaji: "Attack on Titan",
      english: "Attack on Titan",
      native: "進撃の巨人"
    },
    coverImage: {
      extraLarge: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      large: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      medium: "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
    },
    bannerImage: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    format: "TV",
    status: "FINISHED",
    episodes: 75,
    duration: 24,
    season: "SPRING",
    seasonYear: 2013,
    popularity: 50000,
    genres: ["Action", "Drama", "Fantasy"]
  },
  {
    id: 2,
    title: {
      romaji: "Demon Slayer: Kimetsu no Yaiba",
      english: "Demon Slayer: Kimetsu no Yaiba",
      native: "鬼滅の刃"
    },
    coverImage: {
      extraLarge: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      large: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      medium: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg"
    },
    bannerImage: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    format: "TV",
    status: "FINISHED",
    episodes: 26,
    duration: 24,
    season: "SPRING",
    seasonYear: 2019,
    popularity: 45000,
    genres: ["Action", "Supernatural", "Historical"]
  },
  {
    id: 3,
    title: {
      romaji: "Jujutsu Kaisen",
      english: "Jujutsu Kaisen",
      native: "呪術廻戦"
    },
    coverImage: {
      extraLarge: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
      large: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
      medium: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg"
    },
    bannerImage: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    format: "TV",
    status: "RELEASING",
    episodes: 24,
    duration: 24,
    season: "FALL",
    seasonYear: 2020,
    popularity: 40000,
    genres: ["Action", "School", "Supernatural"]
  },
  {
    id: 4,
    title: {
      romaji: "Your Name",
      english: "Your Name",
      native: "君の名は。"
    },
    coverImage: {
      extraLarge: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
      large: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
      medium: "https://cdn.myanimelist.net/images/anime/5/87048.jpg"
    },
    bannerImage: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
    format: "MOVIE",
    status: "FINISHED",
    episodes: 1,
    duration: 106,
    season: "SUMMER",
    seasonYear: 2016,
    popularity: 35000,
    genres: ["Romance", "Drama", "Supernatural"]
  }
];

// Sample anime list for movie list component
export const sampleAnimeList: IAnimeItem[] = [
  ...sampleFeaturedAnime,
  {
    id: 5,
    title: {
      romaji: "One Piece",
      english: "One Piece",
      native: "ワンピース"
    },
    coverImage: {
      extraLarge: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
      large: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
      medium: "https://cdn.myanimelist.net/images/anime/6/73245.jpg"
    },
    bannerImage: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    format: "TV",
    status: "RELEASING",
    episodes: 1000,
    duration: 24,
    season: "FALL",
    seasonYear: 1999,
    popularity: 55000,
    genres: ["Action", "Adventure", "Comedy"]
  },
  {
    id: 6,
    title: {
      romaji: "Naruto",
      english: "Naruto",
      native: "ナルト"
    },
    coverImage: {
      extraLarge: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
      large: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
      medium: "https://cdn.myanimelist.net/images/anime/13/17405.jpg"
    },
    bannerImage: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    format: "TV",
    status: "FINISHED",
    episodes: 220,
    duration: 24,
    season: "FALL",
    seasonYear: 2002,
    popularity: 48000,
    genres: ["Action", "Martial Arts", "Ninja"]
  },
  {
    id: 7,
    title: {
      romaji: "My Hero Academia",
      english: "My Hero Academia",
      native: "僕のヒーローアカデミア"
    },
    coverImage: {
      extraLarge: "https://cdn.myanimelist.net/images/anime/1128/124541.jpg",
      large: "https://cdn.myanimelist.net/images/anime/1128/124541.jpg",
      medium: "https://cdn.myanimelist.net/images/anime/1128/124541.jpg"
    },
    bannerImage: "https://cdn.myanimelist.net/images/anime/1128/124541.jpg",
    format: "TV",
    status: "RELEASING",
    episodes: 138,
    duration: 24,
    season: "SPRING",
    seasonYear: 2016,
    popularity: 38000,
    genres: ["Action", "School", "Superhero"]
  },
  {
    id: 8,
    title: {
      romaji: "Spirited Away",
      english: "Spirited Away",
      native: "千と千尋の神隠し"
    },
    coverImage: {
      extraLarge: "https://cdn.myanimelist.net/images/anime/199/109534.jpg",
      large: "https://cdn.myanimelist.net/images/anime/199/109534.jpg",
      medium: "https://cdn.myanimelist.net/images/anime/199/109534.jpg"
    },
    bannerImage: "https://cdn.myanimelist.net/images/anime/199/109534.jpg",
    format: "MOVIE",
    status: "FINISHED",
    episodes: 1,
    duration: 125,
    season: "SUMMER",
    seasonYear: 2001,
    popularity: 42000,
    genres: ["Adventure", "Family", "Supernatural"]
  }
];