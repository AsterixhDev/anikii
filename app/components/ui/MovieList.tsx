import type { IAnimeItem } from "lib/providers/anikii/types";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
  animes: IAnimeItem[];
  title?: string;
  subtitle?: string;
  favoriteIds?: number[];
  onFavorite?: (id: number) => void;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  gridCols?: "sm" | "md" | "lg";
  cardSize?: "sm" | "md" | "lg";
  showDetails?: boolean;
  className?: string;
}

export function MovieList({
  animes,
  title,
  subtitle,
  favoriteIds = [],
  onFavorite,
  loading = false,
  error,
  emptyMessage = "No anime found",
  gridCols = "md",
  cardSize = "md",
  showDetails = true,
  className = "",
}: MovieListProps): React.ReactElement {
  const gridClasses = {
    sm: "grid-cols-[repeat(auto-fit,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]",
    md: "grid-cols-[repeat(auto-fit,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]",
    lg: "grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]",
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-theme-gradient">{title}</h2>
            {subtitle && (
              <p style={{ color: "var(--color-base-content)/70" }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-4 ${gridClasses[gridCols]}`}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-xl"
              style={{ backgroundColor: "var(--color-base-100)" }}
            >
              <div className="skeleton h-64 w-full"></div>
              <div className="p-4 space-y-2">
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-1/2"></div>
                <div className="skeleton h-8 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-theme-gradient">{title}</h2>
            {subtitle && (
              <p style={{ color: "var(--color-base-content)/70" }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className="alert"
          style={{
            backgroundColor: "var(--color-error)",
            color: "var(--color-error-content)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (animes.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-theme-gradient">{title}</h2>
            {subtitle && (
              <p style={{ color: "var(--color-base-content)/70" }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="text-center py-12">
          <div className="text-6xl mb-4">📺</div>
          <p
            style={{ color: "var(--color-base-content)/70" }}
            className="text-lg"
          >
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {(title || subtitle) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-2xl font-bold text-theme-gradient">{title}</h2>
          )}
          {subtitle && (
            <p style={{ color: "var(--color-base-content)/70" }}>{subtitle}</p>
          )}
        </div>
      )}

      <div className={`grid gap-4 ${gridClasses[gridCols]}`}>
        {animes.map((anime) => (
          <MovieCard
            key={anime.id}
            anime={anime}
            size={cardSize}
            showDetails={showDetails}
            isFavorite={favoriteIds.includes(anime.id)}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    </div>
  );
}
