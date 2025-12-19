import { Layout } from "../components/Layout";
import { SearchWithFilters, MovieList } from "../components/ui";
import { useSearch } from "../../lib/providers/anikii/hooks/search.hooks";
import { useState, useMemo, useEffect } from "react";

interface SearchFilters {
  genre: string[];
  year: string;
  rating: string;
  type: string[];
  sortBy: 'relevance' | 'popularity' | 'rating' | 'year';
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    genre: [],
    year: '',
    rating: '',
    type: [],
    sortBy: 'relevance'
  });

  // Only make API call when there's a search query
  const shouldSearch = searchQuery.trim().length > 0;
  const { data: searchData, loading: isSearching, error: searchError } = useSearch(shouldSearch ? searchQuery : '');

  // Apply client-side filtering and sorting
  const filteredResults = useMemo(() => {
    if (!searchData?.data || !shouldSearch) return [];
    
    let results = [...searchData.data];
    
    // Apply filters
    if (filters.genre.length > 0) {
      results = results.filter(anime => 
        anime.genres?.some(genre => filters.genre.includes(genre))
      );
    }
    
    if (filters.type.length > 0) {
      results = results.filter(anime => 
        filters.type.includes(anime.format || '')
      );
    }
    
    if (filters.year) {
      results = results.filter(anime => 
        anime.seasonYear?.toString() === filters.year
      );
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'popularity':
        results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'rating':
        // Note: This would require averageScore field
        break;
      case 'year':
        results.sort((a, b) => (b.seasonYear || 0) - (a.seasonYear || 0));
        break;
      default: // relevance
        // Keep original order for relevance
        break;
    }
    
    return results;
  }, [searchData?.data, filters, shouldSearch]);

  const handleFilterChange = (filterType: keyof SearchFilters, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleGenre = (genre: string) => {
    const currentGenres = filters.genre;
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter(g => g !== genre)
      : [...currentGenres, genre];
    handleFilterChange('genre', newGenres);
  };

  const toggleType = (type: string) => {
    const currentTypes = filters.type;
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    handleFilterChange('type', newTypes);
  };

  const clearFilters = () => {
    setFilters({
      genre: [],
      year: '',
      rating: '',
      type: [],
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = Boolean(filters.genre.length > 0 || filters.type.length > 0 || filters.year || filters.rating);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-theme-gradient">
            Discover Amazing Anime
          </h1>
          <p className="text-lg text-[var(--color-base-content)/70] max-w-2xl mx-auto">
            Search through thousands of anime series and movies to find your next favorite watch
          </p>
        </div>

        {/* Search with Filters */}
        <SearchWithFilters
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for anime, movies, genres..."
          filters={filters}
          onFilterChange={handleFilterChange}
          onToggleGenre={toggleGenre}
          onToggleType={toggleType}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        >
          {/* This children prop is not used in the current implementation but kept for extensibility */}
          <div></div>
        </SearchWithFilters>

        {/* Results Section */}
        <div>
          {!shouldSearch ? (
            /* No search query - show welcome state */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-2">Start Your Search</h3>
              <p className="text-[var(--color-base-content)/70] mb-6">
                Enter a search term above to discover amazing anime
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Naruto', 'One Piece', 'Attack on Titan', 'Demon Slayer'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--color-base-200)',
                      color: 'var(--color-base-content)'
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : isSearching ? (
            /* Loading state */
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div className="skeleton h-8 w-48"></div>
                <div className="skeleton h-6 w-24"></div>
              </div>
              <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="rounded-2xl shadow-xl" style={{ backgroundColor: 'var(--color-base-100)' }}>
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
          ) : searchError ? (
            /* Error state */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">Search Error</h3>
              <p className="text-[var(--color-base-content)/70] mb-6">
                {searchError || 'Something went wrong while searching'}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="btn btn-primary btn-mobile"
              >
                Try Again
              </button>
            </div>
          ) : filteredResults.length === 0 ? (
            /* No results state */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold mb-2">No Results Found</h3>
              <p className="text-[var(--color-base-content)/70] mb-6">
                We couldn't find any anime matching "{searchQuery}"
                {hasActiveFilters && " with your current filters"}
              </p>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="btn btn-outline btn-mobile"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            /* Results state */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[var(--color-base-content)]">
                  {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                </h3>
                {hasActiveFilters && (
                  <span className="text-sm text-[var(--color-base-content)/60]">
                    Filters applied
                  </span>
                )}
              </div>
              <MovieList
                animes={filteredResults}
                gridCols="lg"
                cardSize="md"
                showDetails={true}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}