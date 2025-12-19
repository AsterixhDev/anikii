import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { FilterDrawer } from './FilterDrawer';
import { FilterChip } from './FilterChip';

interface SearchFilters {
  genre: string[];
  year: string;
  rating: string;
  type: string[];
  sortBy: 'relevance' | 'popularity' | 'rating' | 'year';
}

interface SearchWithFiltersProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  filters: SearchFilters;
  onFilterChange: (filterType: keyof SearchFilters, value: string | string[]) => void;
  onToggleGenre: (genre: string) => void;
  onToggleType: (type: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  children: React.ReactNode;
}

const AVAILABLE_GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 
  'Sci-Fi', 'Thriller', 'Mystery', 'Horror', 'Slice of Life', 'Sports'
];

const AVAILABLE_TYPES = ['TV', 'Movie', 'OVA', 'Special'];
const AVAILABLE_YEARS = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

export function SearchWithFilters({
  value,
  onChange,
  placeholder = "Search...",
  filters,
  onFilterChange,
  onToggleGenre,
  onToggleType,
  onClearFilters,
  hasActiveFilters,
  children
}: SearchWithFiltersProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="mb-8">
      {/* Search Input with Filter Button */}
      <div className="flex gap-4 max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="flex-1">
          <SearchInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full"
          />
        </div>
        
        {/* Filter Button */}
        <button
          onClick={openDrawer}
          className={`
            flex items-center gap-2 px-6 py-4 rounded-2xl font-medium
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-offset-2
            transform hover:scale-105 active:scale-95
            ${hasActiveFilters
              ? 'bg-[var(--color-primary)] text-[var(--color-primary-content)] shadow-lg shadow-[var(--color-primary)]/30' 
              : 'bg-[var(--color-base-200)] text-[var(--color-base-content)] hover:bg-[var(--color-base-300)] border-2 border-[var(--color-base-300)]'
            }
          `}
          aria-label="Open filters"
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="ml-1 w-2 h-2 bg-[var(--color-primary-content)] rounded-full"></span>
          )}
        </button>
      </div>

      {/* Active Filters Preview */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {/* Sort */}
          <FilterChip
            active={true}
            onClick={() => onFilterChange('sortBy', 'relevance')}
          >
            {filters.sortBy.charAt(0).toUpperCase() + filters.sortBy.slice(1)}
          </FilterChip>
          
          {/* Genres */}
          {filters.genre.map((genre) => (
            <FilterChip
              key={genre}
              active={true}
              onClick={() => onToggleGenre(genre)}
            >
              {genre}
            </FilterChip>
          ))}
          
          {/* Types */}
          {filters.type.map((type) => (
            <FilterChip
              key={type}
              active={true}
              onClick={() => onToggleType(type)}
            >
              {type}
            </FilterChip>
          ))}
          
          {/* Year */}
          {filters.year && (
            <FilterChip
              active={true}
              onClick={() => onFilterChange('year', '')}
            >
              {filters.year}
            </FilterChip>
          )}
          
          {/* Clear All */}
          <button
            onClick={onClearFilters}
            className="px-3 py-1 text-xs font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-full transition-colors duration-200"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Drawer */}
      <FilterDrawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <div className="space-y-6">
          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-base-content)] mb-3">
              Sort by
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'relevance', label: 'Relevance' },
                { value: 'popularity', label: 'Popularity' },
                { value: 'rating', label: 'Rating' },
                { value: 'year', label: 'Year' }
              ].map((option) => (
                <FilterChip
                  key={option.value}
                  active={filters.sortBy === option.value}
                  onClick={() => onFilterChange('sortBy', option.value as any)}
                >
                  {option.label}
                </FilterChip>
              ))}
            </div>
          </div>

          {/* Genre Filters */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-base-content)] mb-3">
              Genres
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_GENRES.map((genre) => (
                <FilterChip
                  key={genre}
                  active={filters.genre.includes(genre)}
                  onClick={() => onToggleGenre(genre)}
                >
                  {genre}
                </FilterChip>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-base-content)] mb-3">
              Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_TYPES.map((type) => (
                <FilterChip
                  key={type}
                  active={filters.type.includes(type)}
                  onClick={() => onToggleType(type)}
                >
                  {type}
                </FilterChip>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-base-content)] mb-3">
              Release Year
            </label>
            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_YEARS.map((year) => (
                <FilterChip
                  key={year}
                  active={filters.year === year}
                  onClick={() => onFilterChange('year', filters.year === year ? '' : year)}
                >
                  {year}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>
      </FilterDrawer>
    </div>
  );
}