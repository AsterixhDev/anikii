import { useState } from 'react';
import type { IEpisodeInfo } from 'lib/providers/anikii/types/api.types';

interface Episode {
  number: number;
  title?: string;
  duration?: number;
  thumbnail?: string;
  airedAt?: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  totalEpisodes?: number;
  onEpisodeSelect?: (episode: Episode) => void;
  watchedEpisodes?: number[];
  loading?: boolean;
}

export function EpisodeList({ 
  episodes = [], 
  totalEpisodes,
  onEpisodeSelect,
  watchedEpisodes = [],
  loading = false 
}: EpisodeListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 12;

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isEpisodeWatched = (episodeNumber: number) => {
    return watchedEpisodes.includes(episodeNumber);
  };

  // Generate episode list if we have total episodes but no detailed episodes
  const generateEpisodeList = (): Episode[] => {
    if (episodes.length > 0) return episodes;
    if (totalEpisodes) {
      return Array.from({ length: totalEpisodes }, (_, i) => ({
        number: i + 1,
        title: `Episode ${i + 1}`,
        duration: 24, // Default duration
        thumbnail: undefined,
        airedAt: undefined,
      }));
    }
    return [];
  };

  const episodeList = generateEpisodeList();
  const totalPages = Math.ceil(episodeList.length / episodesPerPage);
  const startIndex = (currentPage - 1) * episodesPerPage;
  const currentEpisodes = episodeList.slice(startIndex, startIndex + episodesPerPage);

  const handleEpisodeClick = (episode: Episode) => {
    if (onEpisodeSelect) {
      onEpisodeSelect(episode);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Episodes</h3>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-white/5">
                <div className="w-16 h-10 bg-gray-700 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Episodes</h3>
        {totalEpisodes && (
          <span className="text-gray-400 text-sm">
            {episodeList.length} episodes
          </span>
        )}
      </div>

      {episodeList.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No episodes available</div>
          <div className="text-gray-500 text-sm">Episode information will be updated soon</div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {currentEpisodes.map((episode) => (
              <div
                key={episode.number}
                onClick={() => handleEpisodeClick(episode)}
                className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 border ${
                  isEpisodeWatched(episode.number)
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Episode Number & Thumbnail */}
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-12 bg-gray-800 rounded-lg overflow-hidden">
                    {episode.thumbnail ? (
                      <img
                        src={episode.thumbnail}
                        alt={`Episode ${episode.number}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs font-medium">
                          EP {episode.number}
                        </span>
                      </div>
                    )}
                  </div>
                  {isEpisodeWatched(episode.number) && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Episode Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">
                    {episode.title || `Episode ${episode.number}`}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                    <span>{formatDuration(episode.duration)}</span>
                    <span>{formatDate(episode.airedAt)}</span>
                  </div>
                </div>

                {/* Play Button */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-200">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-white bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              >
                Previous
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                        currentPage === pageNum
                          ? 'bg-red-600 text-white'
                          : 'text-white bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-white bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}