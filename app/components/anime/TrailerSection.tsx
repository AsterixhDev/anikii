import { useState } from 'react';
import type { ITrailer } from 'lib/providers/anikii/types/api.types';

interface TrailerSectionProps {
  trailer?: ITrailer;
  bannerImage?: string | null;
  title?: string;
}

export function TrailerSection({ trailer, bannerImage, title }: TrailerSectionProps) {
  const [showModal, setShowModal] = useState(false);

  if (!trailer?.id) {
    return null;
  }

  const getYouTubeEmbedUrl = (trailerId: string) => {
    return `https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const getYouTubeThumbnail = (trailerId: string) => {
    return `https://img.youtube.com/vi/${trailerId}/maxresdefault.jpg`;
  };

  return (
    <div className="space-y-6">
      {/* Trailer Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Trailer</h3>
        
        <div className="relative group cursor-pointer" onClick={() => setShowModal(true)}>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
            {/* Thumbnail */}
            {trailer.id && (
              <img
                src={trailer.thumbnail || getYouTubeThumbnail(trailer.id)}
                alt={`${title} trailer`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Trailer Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center space-x-2 text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Watch Trailer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Gallery Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Media Gallery</h3>
        
        {/* This would typically contain promotional images, screenshots, etc. */}
        {/* For now, showing banner image if available */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bannerImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
              <img
                src={bannerImage}
                alt={`${title} banner`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          
          {/* Placeholder for additional media */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">More images coming soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* YouTube Embed */}
            {trailer.id && (
              <iframe
                src={getYouTubeEmbedUrl(trailer.id)}
                title={`${title} trailer`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}