import { Link } from 'react-router';
import { Heart, Play, Info } from 'lucide-react';
import { Button } from './Button';
import type { IAnimeItem } from 'lib/providers/anikii/types';

interface MovieCardProps {
  anime: IAnimeItem;
  onFavorite?: (id: number) => void;
  isFavorite?: boolean;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MovieCard({
  anime,
  onFavorite,
  isFavorite = false,
  showDetails = true,
  size = 'md',
  className = '',
}: MovieCardProps): React.ReactElement {
  const getImageUrl = () => {
    const cover = anime.coverImage;
    return (
      cover?.extraLarge ||
      cover?.large ||
      cover?.medium ||
      cover?.cover_image ||
      '/placeholder-anime.jpg'
    );
  };

  const getTitle = () => {
    return anime.title|| 'Unknown Title';
  };

  const getGenre = () => {
    return anime.genres?.[0] || 'Unknown Genre';
  };

  const getYear = () => {
    return anime.seasonYear || 'Unknown Year';
  };

  const getFormat = () => {
    return anime.format || 'Unknown Format';
  };

  const sizeClasses = {
    sm: 'card-compact',
    md: 'card-normal',
    lg: 'card-bordered',
  };

  return (
    <div className={`group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden ${sizeClasses[size]} ${className}`} style={{ backgroundColor: 'var(--color-base-100)' }}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/5 via-transparent to-[var(--color-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <figure className="relative overflow-hidden rounded-t-2xl">
        <img
          src={getImageUrl()}
          alt={getTitle()}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-neutral)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Favorite button */}
        {onFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavorite(anime.id);
            }}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
              isFavorite
                ? 'shadow-lg scale-110'
                : 'hover:scale-110'
            }`}
            style={{
              backgroundColor: isFavorite ? 'var(--color-error)/90' : 'var(--color-neutral)/40',
              color: isFavorite ? 'var(--color-base-content)' : 'var(--color-base-content)'
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 transition-all duration-300 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Enhanced Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
            <Link to={`/anime/${anime.id}`} className="btn btn-circle btn-primary btn-xl shadow-2xl">
              <Play className="w-7 h-7 fill-current" />
            </Link>
          </div>
        </div>

        {/* Status badge with enhanced styling */}
        {anime.status && (
          <div className="absolute top-3 left-3">
            <div className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border" style={{
              backgroundColor: anime.status === 'RELEASING' ? 'var(--color-success)/90' :
                               anime.status === 'NOT_YET_RELEASED' ? 'var(--color-warning)/90' :
                               'var(--color-base-300)/90',
              color: anime.status === 'RELEASING' ? 'var(--color-success-content)' :
                     anime.status === 'NOT_YET_RELEASED' ? 'var(--color-warning-content)' :
                     'var(--color-base-content)',
              borderColor: anime.status === 'RELEASING' ? 'var(--color-success)/50' :
                          anime.status === 'NOT_YET_RELEASED' ? 'var(--color-warning)/50' :
                          'var(--color-base-300)/50'
            }}>
              {anime.status.replace('_', ' ')}
            </div>
          </div>
        )}

        {/* Animated shine effect */}
        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-[var(--color-base-content)]/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </figure>

      {showDetails && (
        <div className="card-body p-4 sm:p-6 relative z-10">
          <h3 className="card-title text-base sm:text-lg font-bold line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-300" style={{ color: 'var(--color-base-content)' }}>
            {getTitle()}
          </h3>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="badge badge-primary badge-outline badge-xs sm:badge-sm font-medium">
              {getGenre()}
            </span>
            <span className="badge badge-secondary badge-outline badge-xs sm:badge-sm font-medium">
              {getFormat()}
            </span>
            <span className="badge badge-accent badge-outline badge-xs sm:badge-sm font-medium">
              {getYear()}
            </span>
          </div>

          {anime.episodes && (
            <p className="text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: 'var(--color-base-content)/70' }}>
              <span className="font-medium">{anime.episodes}</span> episodes
              {anime.duration && <span style={{ color: 'var(--color-base-content)/50' }}> • {anime.duration} min/ep</span>}
            </p>
          )}

          <div className="card-actions justify-between mt-3 sm:mt-4">
            <Button
              variant="primary"
              size="xs"
              to={`/anime/${anime.id}`}
              className="flex-1 shadow-lg btn-mobile text-xs sm:text-sm"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Watch
            </Button>
            
            <Button
              variant="ghost"
              size="xs"
              to={`/anime/${anime.id}/info`}
              className="btn-square shadow-md btn-mobile w-8 h-8 sm:w-10 sm:h-10"
            >
              <Info className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-theme-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}