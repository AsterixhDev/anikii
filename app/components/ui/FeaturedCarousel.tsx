import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Heart, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import type { IAnimeItem } from 'lib/providers/anikii/types';

interface FeaturedCarouselProps {
  animes: IAnimeItem[];
  autoPlay?: boolean;
  interval?: number;
  showThumbnails?: boolean;
  onFavorite?: (id: number) => void;
  favoriteIds?: number[];
  className?: string;
}

export function FeaturedCarousel({
  animes,
  autoPlay = true,
  interval = 6000,
  showThumbnails = true,
  onFavorite,
  favoriteIds = [],
  className = '',
}: FeaturedCarouselProps): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('favoriteAnime');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const effectiveFavoriteIds = favoriteIds.length > 0 ? favoriteIds : favorites;

  const toggleFavorite = (id: number) => {
    const newFavorites = effectiveFavoriteIds.includes(id)
      ? effectiveFavoriteIds.filter(fav => fav !== id)
      : [...effectiveFavoriteIds, id];
    
    setFavorites(newFavorites);
    try {
      localStorage.setItem('favoriteAnime', JSON.stringify(newFavorites));
    } catch {}
    
    onFavorite?.(id);
  };

  // Auto-play functionality with smooth transitions
  useEffect(() => {
    if (!autoPlay || animes.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % animes.length);
        setIsTransitioning(false);
      }, 150);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, animes.length]);

  if (!animes.length) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <div className="skeleton h-96 w-full rounded-2xl" style={{ backgroundColor: 'var(--color-base-200)' }}></div>
      </div>
    );
  }

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + animes.length) % animes.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % animes.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  const getImageUrl = (anime: IAnimeItem) => {
    const cover = anime.coverImage;
    return (
      cover?.extraLarge ||
      cover?.large ||
      cover?.medium ||
      cover?.cover_image ||
      '/placeholder-anime.jpg'
    );
  };

  const getTitle = (anime: IAnimeItem) => {
    return anime.title || 'Unknown Title';
  };

  const getGenre = (anime: IAnimeItem) => {
    return anime.genres?.[0] || 'Unknown Genre';
  };

  const currentAnime = animes[currentIndex];

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${className}`}>
      {/* Main Carousel Container */}
      <div className="relative w-full h-90 md:h-[28rem] lg:h-[32rem] overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          {animes.map((anime, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={getImageUrl(anime)}
                alt={getTitle(anime)}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Enhanced Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neutral)]/80 via-[var(--color-neutral)]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-neutral)]/60 via-[var(--color-neutral)]/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-[var(--color-secondary)]/20" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className={`max-w-3xl text-[var(--color-base-content)] space-y-4 sm:space-y-6 transition-all duration-500 ${
              isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
            }`}>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold" style={{ 
                    backgroundColor: 'var(--color-warning)', 
                    color: 'var(--color-warning-content)' 
                  }}>
                    FEATURED
                  </span>
                  <span className="text-[var(--color-base-content)]/70 text-xs sm:text-sm font-medium">
                    {currentIndex + 1} of {animes.length}
                  </span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tight">
                  <span className="text-white">
                    {getTitle(currentAnime)}
                  </span>
                </h1>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm" style={{
                    backgroundColor: 'var(--color-base-100)/20',
                    borderColor: 'var(--color-base-100)/30',
                    color: 'var(--color-base-content)'
                  }}>
                    {getGenre(currentAnime)}
                  </span>
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm" style={{
                    backgroundColor: 'var(--color-base-100)/20',
                    borderColor: 'var(--color-base-100)/30',
                    color: 'var(--color-base-content)'
                  }}>
                    {currentAnime.format || 'Anime'}
                  </span>
                  {currentAnime.seasonYear && (
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm" style={{
                      backgroundColor: 'var(--color-base-100)/20',
                      borderColor: 'var(--color-base-100)/30',
                      color: 'var(--color-base-content)'
                    }}>
                      {currentAnime.seasonYear}
                    </span>
                  )}
                  {currentAnime.episodes && (
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-sm" style={{
                      backgroundColor: 'var(--color-base-100)/20',
                      borderColor: 'var(--color-base-100)/30',
                      color: 'var(--color-base-content)'
                    }}>
                      {currentAnime.episodes} Episodes
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--color-base-content)]/90 leading-relaxed max-w-2xl font-light">
                  {currentAnime.popularity ? `${currentAnime.popularity.toLocaleString()} people love this` : 'Discover amazing anime with stunning visuals and compelling stories'}
                </p>
              </div>

              <div className="w-full flex flex-row items-start xs:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button
                  variant="gradient"
                  size="sm"
                  to={`/anime/${currentAnime.id}`}
                  className="shadow-2xl btn-mobile w-auto !text-white"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 fill-current" />
                  Watch Now
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFavorite(currentAnime.id)}
                  className="backdrop-blur-sm btn-mobile w-auto"
                  style={{
                    backgroundColor: 'var(--color-base-100)/10',
                    borderColor: 'var(--color-base-100)/30',
                    color: 'var(--color-base-content)'
                  }}
                >
                  <Heart 
                    className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${
                      effectiveFavoriteIds.includes(currentAnime.id) ? 'fill-current' : ''
                    }`}
                    style={{
                      color: effectiveFavoriteIds.includes(currentAnime.id) ? 'var(--color-error)' : 'inherit'
                    }}
                  />
                  {effectiveFavoriteIds.includes(currentAnime.id) ? 'In My List' : 'Add to List'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {animes.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="absolute left-2 sm:left-4 bottom-2 w-10 h-10 sm:w-14 sm:h-14 rounded-full backdrop-blur-md border disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group mobile-z-50"
            style={{
              backgroundColor: 'var(--color-base-100)/20',
              borderColor: 'var(--color-base-100)/30',
              color: 'var(--color-base-content)'
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="absolute right-2 sm:right-4 bottom-2 w-10 h-10 sm:w-14 sm:h-14 rounded-full backdrop-blur-md border disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group mobile-z-50"
            style={{
              backgroundColor: 'var(--color-base-100)/20',
              borderColor: 'var(--color-base-100)/30',
              color: 'var(--color-base-content)'
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Progress Indicators */}
      {animes.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 z-20">
          {animes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-6 h-1.5 sm:w-8 sm:h-2 rounded-full' 
                  : 'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full'
              }`}
              style={{
                backgroundColor: index === currentIndex ? 'var(--color-primary)' : 'var(--color-base-100)/50'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Navigation */}
      {showThumbnails && animes.length > 1 && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col space-y-3 z-20 max-h-[80%] overflow-auto">
          {animes.slice(0, 5).map((anime, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`relative w-16 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                index === currentIndex 
                  ? 'shadow-lg' 
                  : ''
              }`}
              style={{
                borderColor: index === currentIndex ? 'var(--color-primary)' : 'var(--color-base-100)/30'
              }}
              aria-label={`Go to ${getTitle(anime)}`}
            >
              <img
                src={getImageUrl(anime)}
                alt={getTitle(anime)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-neutral)]/60 to-transparent" />
              {index === currentIndex && (
                <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-primary)/20' }} />
              )}
            </button>
          ))}
          
          {animes.length > 5 && (
            <div className="w-16 h-24 rounded-xl border-2 flex items-center justify-center text-[var(--color-base-content)] text-xs font-medium backdrop-blur-sm" style={{
              backgroundColor: 'var(--color-neutral)/50',
              borderColor: 'var(--color-base-100)/30'
            }}>
              +{animes.length - 5}
            </div>
          )}
        </div>
      )}

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-base-content)/20' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full animate-pulse delay-1000" style={{ backgroundColor: 'var(--color-secondary)/30' }} />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full animate-pulse delay-500" style={{ backgroundColor: 'var(--color-accent)/25' }} />
      </div>
    </div>
  );
}