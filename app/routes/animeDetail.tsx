import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import {
  useAnimeDetails,
  useAnimeTrailers,
  useAnimeRecommended,
} from "../../lib/providers/anikii/hooks/anime.hooks";
import { AnimeHero } from "../components/anime/AnimeHero";
import { AnimeMeta } from "../components/anime/AnimeMeta";
import { EpisodeList } from "../components/anime/EpisodeList";
import { TrailerSection } from "../components/anime/TrailerSection";
import { Recommendations } from "../components/anime/Recommendations";
import { useNavigate, useParams } from "react-router";

export default function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [watchedEpisodes, setWatchedEpisodes] = useState<number[]>([]);

  const animeId = id ? parseInt(id, 10) : 0;
  const {
    data: animeData,
    loading: animeLoading,
    error: animeError,
  } = useAnimeDetails(animeId);
  const { data: trailerData, loading: trailerLoading } =
    useAnimeTrailers(animeId);
  const { data: recommendationsData, loading: recommendationsLoading } =
    useAnimeRecommended(animeId);

  const anime = animeData?.data;
  const trailer = trailerData?.data?.trailer;
  const recommendations = recommendationsData?.data || [];

  const formatTitle = (title: any) => {
    if (!title) return "Unknown Title";
    if (typeof title === "string") return title;
    return title.english || title.romaji || title.native || "Unknown Title";
  };

  const handleWatchNow = () => {
    if (anime?.episodes && anime.episodes > 0) {
      navigate(`/watch/${anime.id}/1`);
    } else {
      alert("Episode information not available yet. Check back soon!");
    }
  };

  const handleAddToList = () => {
    alert(`Added "${formatTitle(anime?.title)}" to your list!`);
  };

  const handleFavorite = () => {
    alert(`Added "${formatTitle(anime?.title)}" to your favorites!`);
  };

  const handleEpisodeSelect = (episode: any) => {
    navigate(`/watch/${anime?.id}/${episode.number}`);
  };

  const handleAnimeSelect = (selectedAnime: any) => {
    navigate(`/anime/${selectedAnime.id}`);
  };

  const handleAnimeFavorite = (favoritedAnime: any) => {
    alert(`Added "${formatTitle(favoritedAnime.title)}" to your favorites!`);
  };

  if (animeError) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Error Loading Anime</h1>
            <p className="text-gray-400 mb-6">{animeError}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Go Home
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (animeLoading || !anime) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin w-12 h-12 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading anime details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <AnimeHero
          anime={anime}
          onWatchNow={handleWatchNow}
          onAddToList={handleAddToList}
          onFavorite={handleFavorite}
        />

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Poster and Metadata */}
            <div className="lg:col-span-1 space-y-8">
              {/* Metadata */}
              <AnimeMeta anime={anime} />
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Synopsis */}
              {anime.description && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Synopsis
                  </h3>
                  <div className="text-gray-300 leading-relaxed">
                    {anime.description.length > 1000 ? (
                      <div className="relative">
                        <p className="max-h-32 overflow-hidden">
                          {anime.description}
                        </p>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      </div>
                    ) : (
                      <p>{anime.description}</p>
                    )}
                  </div>

                  {/* Genres */}
                  {anime.genres && anime.genres.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Genres
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {anime.genres.map((genre: string) => (
                          <span
                            key={genre}
                            className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30 hover:bg-red-500/30 transition-colors duration-200 cursor-pointer"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Episodes */}
              <EpisodeList
                episodes={[]}
                totalEpisodes={anime.episodes || undefined}
                onEpisodeSelect={handleEpisodeSelect}
                watchedEpisodes={watchedEpisodes}
                loading={animeLoading}
              />

              {/* Trailer and Media */}
              <TrailerSection
                trailer={trailer}
                bannerImage={anime.bannerImage}
                title={formatTitle(anime.title)}
              />
            </div>
          </div>

          {/* Recommendations */}
          <Recommendations
            recommendations={recommendations}
            loading={recommendationsLoading}
            onAnimeSelect={handleAnimeSelect}
            onAnimeFavorite={handleAnimeFavorite}
          />
        </div>
      </div>
    </Layout>
  );
}
