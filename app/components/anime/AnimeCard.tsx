import { useState } from 'react';
import type { IAnimeItem } from 'lib/providers/anikii/types/api.types';

interface AnimeCardProps {
  anime: IAnimeItem;
  onClick?: (anime: IAnimeItem) => void;
  onFavorite?: (anime: IAnimeItem) => void;
  showScore?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AnimeCard({ 
  anime, 
  onClick, 
  onFavorite, 
  showScore = true,
  size = 'md',
  className = ''
}: AnimeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatTitle = (title: any) => {
    if (!title) return 'Unknown Title';
    if (typeof title === 'string') return title;
    return title.english || title.romaji || title.native || 'Unknown Title';
  };

  const getImageUrl = () => {
    if (!anime.coverImage) return null;
    return anime.coverImage.extraLarge || anime.coverImage.large || anime.coverImage.medium || anime.coverImage.cover_image;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-36',
          image: 'h-52',
          title: 'text-sm',
          meta: 'text-xs'
        };
      case 'lg':
        return {
          container: 'w-56',
          image: 'h-80',
          title: 'text-lg',
          meta: 'text-sm'
        };
      default: // md
        return {
          container: 'w-48',
          image: 'h-68',
          title: 'text-base',
          meta: 'text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const handleCardClick = () => {
    if (onClick) {
      onClick(anime);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(anime);
    }
  };

  return (
    <div className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 ${sizeClasses.container} ${className}`}>
      <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
        {/* Image Container */}
        <div className={`relative ${sizeClasses.image} overflow-hidden`}>
          {getImageUrl() && !imageError ? (
            <>
              <img
                src={getImageUrl()!}
                alt={formatTitle(anime.title)}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">No Image</span>
              </div>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          {onFavorite && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600/80 hover:scale-110"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}

          {/* Status Badge */}
          {anime.status && (
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                anime.status === 'AIRING' ? 'bg-green-500 text-white' :
                anime.status === 'FINISHED' || anime.status === 'FINISHED_AIRING' ? 'bg-blue-500 text-white' :
                anime.status === 'NOT_YET_AIRED' ? 'bg-yellow-500 text-black' :
                'bg-gray-500 text-white'
              }`}>
                {anime.status === 'AIRING' ? 'Airing' :
                 anime.status === 'FINISHED' || anime.status === 'FINISHED_AIRING' ? 'Completed' :
                 anime.status === 'NOT_YET_AIRED' ? 'Upcoming' :
                 anime.status}
              </span>
            </div>
          )}

          {/* Quick Info on Hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-between text-white text-xs">
              {anime.format && (
                <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                  {anime.format}
                </span>
              )}
              {anime.episodes && (
                <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                  {anime.episodes} eps
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className={`font-semibold text-white line-clamp-2 mb-2 ${sizeClasses.title} group-hover:text-red-400 transition-colors duration-200`}>
            {formatTitle(anime.title)}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {showScore && anime.popularity && (
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-300 text-sm">{anime.popularity}</span>
                </div>
              )}
            </div>
            
            {anime.seasonYear && (
              <span className="text-gray-400 text-sm">
                {anime.seasonYear}
              </span>
            )}
          </div>

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {anime.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-gray-300 border border-white/20"
                >
                  {genre}
                </span>
              ))}
              {anime.genres.length > 2 && (
                <span className="px-2 py-1 text-xs text-gray-400">
                  +{anime.genres.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}