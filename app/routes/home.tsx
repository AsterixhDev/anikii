import React, { useCallback, useMemo } from "react";
import { Layout } from "../components/Layout";
import { FeaturedCarousel } from "../components/ui/FeaturedCarousel";
import { MovieList } from "../components/ui/MovieList";
import { useHomeData } from "../../lib/providers/anikii/hooks/home.hooks";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Anikii" },
    {
      name: "description",
      content: "Welcome to Anikii - Your anime discovery platform",
    },
  ];
}

// Memoized Home component to prevent unnecessary re-renders
const HomeComponent = () => {
  // Single API call for all home data to prevent multiple renders
  const { data: homeData, loading: isLoading, error: hasError } = useHomeData();

  // Memoize data extraction to prevent unnecessary re-renders
  const popularAnime = useMemo(() => homeData?.popular?.data || [], [homeData?.popular?.data]);
  const recentReleases = useMemo(() => homeData?.releases?.data || [], [homeData?.releases?.data]);
  const recommendedAnime = useMemo(() => homeData?.upcoming?.data || [], [homeData?.upcoming?.data]);
  
  // Memoize featured anime (first 5 from popular)
  const featuredAnime = useMemo(() => popularAnime.slice(0, 5), [popularAnime]);

  // Memoize data availability checks
  const hasPopularData = useMemo(() => popularAnime.length > 0, [popularAnime]);
  const hasReleasesData = useMemo(() => recentReleases.length > 0, [recentReleases]);
  const hasRecommendedData = useMemo(() => recommendedAnime.length > 0, [recommendedAnime]);

  // Memoize retry function to prevent re-creation on every render
  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        {/* Loading skeleton */}
        <div className="space-y-8">
          {/* Featured Carousel Skeleton */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="skeleton h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] w-full rounded-2xl"></div>
          </div>
          
          {/* Section Skeletons */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative">
              <div className="skeleton h-96 w-full rounded-3xl"></div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  if (hasError) {
    return (
      <Layout>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Unable to load anime data</h2>
          <p className="text-[var(--color-base-content)/70] mb-6">
            {hasError || 'Something went wrong while fetching anime data'}
          </p>
          <button 
            onClick={handleRetry}
            className="btn btn-primary btn-mobile"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Featured Carousel */}
      {featuredAnime.length > 0 && (
        <FeaturedCarousel
          animes={featuredAnime}
          autoPlay={true}
          interval={6000}
          showThumbnails={true}
        />
      )}

      {/* Popular Anime Section */}
      {hasPopularData && (
        <div className="relative mt-8 sm:mt-12 md:mt-16">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ backgroundColor: "var(--color-primary)/10" }}
          />
          <div
            className="relative backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-[var(--color-base-300)]/20 shadow-2xl"
            style={{ backgroundColor: "var(--color-base-100)/80" }}
          >
            <MovieList
              animes={popularAnime.slice(0, 6)}
              title="🔥 Popular This Season"
              subtitle="Trending anime that everyone's watching right now"
              gridCols="lg"
              cardSize="md"
            />
          </div>
        </div>
      )}

      {/* Recent Releases */}
      {hasReleasesData && (
        <div className="relative mt-8 sm:mt-12 md:mt-16">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ backgroundColor: "var(--color-secondary)/10" }}
          />
          <div
            className="relative backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-[var(--color-base-300)]/20 shadow-2xl"
            style={{ backgroundColor: "var(--color-base-100)/80" }}
          >
            <MovieList
              animes={recentReleases.slice(0, 6)}
              title="✨ Recent Releases"
              subtitle="Fresh anime just added to our catalog"
              gridCols="lg"
              cardSize="sm"
            />
          </div>
        </div>
      )}

      {/* Recommended For You */}
      {hasRecommendedData && (
        <div className="relative mt-8 sm:mt-12 md:mt-16">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{ backgroundColor: "var(--color-accent)/10" }}
          />
          <div
            className="relative backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 border border-[var(--color-base-300)]/20 shadow-2xl"
            style={{ backgroundColor: "var(--color-base-100)/80" }}
          >
            <MovieList
              animes={recommendedAnime.slice(0, 8)}
              title="🎯 Recommended For You"
              subtitle="Based on your viewing history and preferences"
              gridCols="lg"
              cardSize="md"
            />
          </div>
        </div>
      )}

      {/* Enhanced Statistics Section */}
      <div className="relative mt-8 sm:mt-12 md:mt-16">
        <div className="absolute inset-0 bg-theme-gradient-soft rounded-3xl"></div>
        <div
          className="relative rounded-3xl border backdrop-blur-xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--color-base-100)/90",
            borderColor: "var(--color-base-300)/20",
          }}
        >
          {/* Header Section */}
          <div className="text-center py-6 sm:py-8 px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-theme-gradient">
              Platform Statistics
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-base-content)/70]">
              Discover the scale of anime content available on Anikii
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {/* Anime Series */}
            <div className="group relative p-6 sm:p-8 text-center hover:bg-[var(--color-primary)]/5 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-primary-content)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                  </svg>
                </div>
                <div
                  className="text-3xl sm:text-4xl font-bold mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  1000+
                </div>
                <div
                  className="text-sm font-medium mb-1"
                  style={{ color: "var(--color-base-content)" }}
                >
                  Anime Series
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-base-content)/70" }}
                >
                  Available for streaming
                </div>
              </div>
            </div>

            {/* Movies */}
            <div className="group relative p-6 sm:p-8 text-center hover:bg-[var(--color-secondary)]/5 transition-all duration-500 border-t sm:border-t-0 border-x-0 sm:border-x border-[var(--color-base-300)]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary)]/80 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-secondary-content)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div
                  className="text-3xl sm:text-4xl font-bold mb-2"
                  style={{ color: "var(--color-secondary)" }}
                >
                  500+
                </div>
                <div
                  className="text-sm font-medium mb-1"
                  style={{ color: "var(--color-base-content)" }}
                >
                  Movies & OVAs
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-base-content)/70" }}
                >
                  Anime movies and special episodes
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="group relative p-6 sm:p-8 text-center hover:bg-[var(--color-accent)]/5 transition-all duration-500 border-t sm:border-t-0 border-[var(--color-base-300)]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent)]/80 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--color-accent-content)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div
                  className="text-3xl sm:text-4xl font-bold mb-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  25+
                </div>
                <div
                  className="text-sm font-medium mb-1"
                  style={{ color: "var(--color-base-content)" }}
                >
                  Genres
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-base-content)/70" }}
                >
                  Different anime categories
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default React.memo(HomeComponent);
