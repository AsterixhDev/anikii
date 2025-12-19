import type { IAnimeDetails } from 'lib/providers/anikii/types/api.types';

interface AnimeMetaProps {
  anime: IAnimeDetails;
}

export function AnimeMeta({ anime }: AnimeMetaProps) {
  const formatTitle = (title: any) => {
    if (!title) return 'Unknown Title';
    if (typeof title === 'string') return title;
    return title.english || title.romaji || title.native || 'Unknown Title';
  };

  const formatDate = (date: any) => {
    if (!date) return 'Unknown';
    // Handle season object case
    if (typeof date === 'object' && date.type !== undefined) {
      return date.year ? date.year.toString() : 'Unknown';
    }
    const { year, month, day } = date;
    if (!year) return 'Unknown';
    if (month && day) {
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
    return year.toString();
  };

  const formatDuration = (minutes: number | null | undefined) => {
    if (!minutes) return 'Unknown';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const metaItems = [
    { label: 'Episodes', value: anime.episodes || 'Unknown' },
    { label: 'Format', value: anime.format || 'Unknown' },
    { label: 'Status', value: anime.status || 'Unknown' },
    { label: 'Duration', value: formatDuration(anime.duration) },
    { label: 'Start Date', value: formatDate(anime.startDate) },
    { label: 'End Date', value: formatDate(anime.endDate) },
    { label: 'Season', value: anime.seasonObject?.type || anime.season || 'Unknown' },
    { label: 'Season Year', value: anime.seasonObject?.year || anime.seasonYear || anime.releaseDate || 'Unknown' },
    { label: 'Average Score', value: anime.averageScore ? `${anime.averageScore}/100` : 'Not rated' },
    { label: 'Popularity', value: anime.popularity || 'Unknown' }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-semibold text-white mb-6">Details</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {metaItems.map((item) => (
          <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-2">
            <dt className="text-gray-400 text-sm font-medium min-w-[100px]">
              {item.label}:
            </dt>
            <dd className="text-white font-medium">
              {String(item.value)}
            </dd>
          </div>
        ))}
      </div>

      {/* Studios */}
      {anime.studios && anime.studios.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3">Studios</h4>
          <div className="flex flex-wrap gap-2">
            {anime.studios.map((studio) => (
              <span
                key={studio}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30"
              >
                {studio}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Synonyms */}
      {anime.synonyms && anime.synonyms.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-lg font-semibold text-white mb-3">Alternative Titles</h4>
          <div className="flex flex-wrap gap-2">
            {anime.synonyms.map((synonym) => (
              <span
                key={synonym}
                className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-lg text-sm border border-gray-500/30"
              >
                {synonym}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}