import React from 'react';
import { usePlayerStore } from '../store/playerStore';
import { Disc, Play } from 'lucide-react';

export const CrateView: React.FC = () => {
  const {
    collections,
    currentCollection,
    selectCollection,
    searchQuery,
    filterType,
    setFilterType,
    isPlaying
  } = usePlayerStore();

  const filteredCollections = collections.filter((c) => {
    const matchesFilter = filterType === 'all' || c.type === filterType;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 bg-[#0A0C0E]">
      {/* Crate Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#1C232B]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[var(--brass)] font-semibold">
              The Crate Archive
            </span>
            <span className="text-xs text-[var(--text-faint)]">•</span>
            <span className="text-xs text-[var(--text-muted)]">
              {filteredCollections.length} record{filteredCollections.length !== 1 ? 's' : ''} in crate
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--sleeve)]">
            Browse Vinyl Sleeves
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Pull any record from the shelf to place the disc on the turntable platter.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0E1216] border border-[#202730] self-start sm:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterType === 'all'
                ? 'bg-[#1C242E] text-[var(--sleeve)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            All Crates
          </button>
          <button
            onClick={() => setFilterType('album')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterType === 'album'
                ? 'bg-[#1C242E] text-[var(--sleeve)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            Albums
          </button>
          <button
            onClick={() => setFilterType('playlist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterType === 'playlist'
                ? 'bg-[#1C242E] text-[var(--sleeve)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            Playlists
          </button>
        </div>
      </div>

      {/* Grid of vinyl sleeves */}
      {filteredCollections.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-[#202730] bg-[#0E1216]">
          <Disc className="w-10 h-10 mx-auto text-[var(--text-faint)] mb-3 animate-spin" style={{ animationDuration: '6s' }} />
          <h3 className="font-display text-lg font-medium text-[var(--sleeve)]">No matching records</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mt-1">
            No vinyl sleeves match "{searchQuery}". Try searching for another artist or clear your filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 pt-6">
          {filteredCollections.map((col) => {
            const isCurrentlyActive = currentCollection?.id === col.id;

            return (
              <div
                key={col.id}
                onClick={() => selectCollection(col, true)}
                className="crate-sleeve-wrapper group cursor-pointer flex flex-col"
              >
                {/* Vinyl record peeking out top */}
                <div
                  className="crate-peeking-disc"
                  style={{
                    backgroundColor: '#050608',
                    border: '1px solid #1C232B'
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at center, ${col.dominantColor} 0%, #050608 45%)`,
                      opacity: 0.45
                    }}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0A0C0E] border border-[var(--brass)]" />
                </div>

                {/* Cardboard sleeve jacket */}
                <div className="crate-sleeve group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all bg-[#0E1216]">
                  <img
                    src={col.coverUrl}
                    alt={col.title}
                    loading="eager"
                    className="w-full h-full object-cover select-none group-hover:scale-[1.02] transition-transform duration-300 block"
                  />

                  {/* Play overlay badge on hover */}
                  <div className="absolute inset-0 bg-[#000000]/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-[var(--brass)] text-[#050608] flex items-center justify-center shadow-2xl transform group-hover:scale-100 scale-75 transition-transform duration-200">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Active playing indicator badge */}
                  {isCurrentlyActive && (
                    <div className="absolute bottom-2 right-2 z-20 px-2.5 py-0.5 rounded-full bg-[#080A0D] border border-[var(--brass)] flex items-center gap-1.5 shadow-lg">
                      <div className={`w-2 h-2 rounded-full bg-[var(--brass)] ${isPlaying ? 'animate-ping' : ''}`} />
                      <span className="text-[10px] uppercase font-bold text-[var(--brass)]">
                        {isPlaying ? 'Spinning' : 'Loaded'}
                      </span>
                    </div>
                  )}

                  {/* Type tag (Album/Playlist) */}
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-[#080A0D] text-[9px] uppercase tracking-wider text-[var(--sleeve)] border border-[#232B34] font-semibold">
                    {col.year || col.type}
                  </div>
                </div>

                {/* Sleeve typography & metadata */}
                <div className="mt-3.5 space-y-0.5">
                  <h3 className="font-display text-sm font-semibold text-[var(--sleeve)] line-clamp-1 group-hover:text-[var(--brass)] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                    {col.artist}
                  </p>
                  <p className="text-[11px] text-[var(--text-faint)] flex items-center gap-1.5 pt-0.5">
                    <span>{col.trackCount} tracks</span>
                    <span>•</span>
                    <span className="capitalize">{col.type}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
