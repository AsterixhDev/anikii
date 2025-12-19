import { useState } from "react";
import type { IAnimeDetails } from "lib/providers/anikii/types/api.types";

interface AnimeHeroProps {
  anime: IAnimeDetails;
  onWatchNow?: () => void;
  onAddToList?: () => void;
  onFavorite?: () => void;
}

export function AnimeHero({
  anime,
  onWatchNow,
  onAddToList,
  onFavorite,
}: AnimeHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatTitle = (title: any) => {
    if (!title) return "Unknown Title";
    if (typeof title === "string") return title;
    return title.english || title.romaji || title.native || "Unknown Title";
  };

  const formatYear = (date: any, seasonObject?: any, releaseDate?: number) => {
    if (seasonObject?.year) return seasonObject.year.toString();
    if (date?.year) return date.year.toString();
    if (releaseDate) return releaseDate.toString();
    return "Unknown";
  };

  const formatStatus = (status: string | null | undefined) => {
    if (!status) return { text: "Unknown", color: "bg-gray-500" };
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "airing":
        return { text: "Airing", color: "bg-green-500" };
      case "finished":
      case "finished_airing":
        return { text: "Completed", color: "bg-blue-500" };
      case "not_yet_aired":
        return { text: "Upcoming", color: "bg-yellow-500" };
      default:
        return { text: status, color: "bg-gray-500" };
    }
  };

  const statusInfo = formatStatus(anime.status);

  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden">
      {/* Background Banner */}
      <div className="absolute inset-0 isolate">
        {anime.bannerImage && (
          <>
            <img
              src={anime.bannerImage}
              alt={formatTitle(anime.title)}
              className={`h-full w-full object-cover transition-opacity duration-700 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse" />
            )}
          </>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="size-full absolute inset z-0 brightness-30 rounded-xl overflow-hidden">
          {anime.coverImage?.extraLarge ||
          anime.coverImage?.large ||
          anime.coverImage?.medium ||
          anime.coverImage?.cover_image ? (
            <img
              src={
                anime.coverImage?.extraLarge ||
                anime.coverImage?.large ||
                anime.coverImage?.medium ||
                anime.coverImage?.cover_image
              }
              alt={formatTitle(anime.title)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="container mx-auto px-6 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="w-48 h-72 lg:w-56 lg:h-80 rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-300 group-hover:scale-105">
                  {anime.coverImage?.extraLarge ||
                  anime.coverImage?.large ||
                  anime.coverImage?.medium ||
                  anime.coverImage?.cover_image ? (
                    <img
                      src={
                        anime.coverImage?.extraLarge ||
                        anime.coverImage?.large ||
                        anime.coverImage?.medium ||
                        anime.coverImage?.cover_image
                      }
                      alt={formatTitle(anime.title)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  {formatTitle(anime.title)}
                </h1>
                {typeof anime.title === "object" &&
                  anime.title?.romaji &&
                  anime.title?.english &&
                  anime.title.romaji !== anime.title.english && (
                    <p className="text-xl lg:text-2xl text-gray-300 font-light">
                      {anime.title.romaji}
                    </p>
                  )}
              </div>

              {/* Status and Meta */}
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${statusInfo.color}`}
                >
                  {statusInfo.text}
                </span>
                {anime.averageScore && (
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white font-medium">
                      {anime.averageScore}
                    </span>
                  </div>
                )}
                {anime.format && (
                  <span className="text-gray-300 text-sm">{anime.format}</span>
                )}
                {(anime.seasonYear ||
                  anime.releaseDate ||
                  anime.seasonObject?.year) && (
                  <span className="text-gray-300 text-sm">
                    {formatYear(
                      anime.startDate,
                      anime.seasonObject,
                      anime.releaseDate
                    )}
                  </span>
                )}
                {anime.popularity && (
                  <span className="text-gray-300 text-sm">
                    Popularity: #{anime.popularity}
                  </span>
                )}
              </div>

              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {anime.genres.slice(0, 5).map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white border border-white/20"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={onWatchNow}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch Now
                </button>

                <button
                  onClick={onAddToList}
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transform transition-all duration-200 hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add to List
                </button>

                <button
                  onClick={onFavorite}
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transform transition-all duration-200 hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Favorite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
