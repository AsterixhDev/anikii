import { useState, useRef } from "react";
import type {
  IAnimeDetails,
  IAnimeItem,
} from "lib/providers/anikii/types/api.types";
import { AnimeCard } from "./AnimeCard";
import { MovieList } from "../ui";

interface RecommendationsProps {
  recommendations: IAnimeItem[];
  loading?: boolean;
  onAnimeSelect?: (anime: IAnimeItem) => void;
  onAnimeFavorite?: (anime: IAnimeItem) => void;
}

export function Recommendations({
  recommendations = [],
  loading = false,
  onAnimeSelect,
  onAnimeFavorite,
}: RecommendationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const cardsPerView = {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  };

  const getCardWidth = () => {
    if (!scrollContainerRef.current) return 192; // Default width
    const containerWidth = scrollContainerRef.current.clientWidth;
    return Math.floor(containerWidth / cardsPerView.lg);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;

    const cardWidth = getCardWidth();
    const scrollLeft = index * (cardWidth + 16); // 16px gap
    scrollContainerRef.current.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const cardWidth = getCardWidth();
    const newIndex = Math.round(scrollLeft / (cardWidth + 16));
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, recommendations.length - cardsPerView.lg);
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">
          You May Also Like
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="aspect-[3/4] bg-gray-700"></div>
                <div className="p-3 space-y-2">
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

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <MovieList
        animes={recommendations.slice(0, 6)}
        title="You May Also Like"
        subtitle={`${recommendations.length} recommendations`}
        gridCols="sm"
        cardSize="sm"
      />
    </div>
  );
}
