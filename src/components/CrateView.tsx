import React from 'react';
import { usePlayerStore } from '../store/playerStore';
import { Disc, Play, ArrowLeft } from 'lucide-react';

export const CrateView: React.FC = () => {
  const {
    collections,
    currentCollection,
    selectCollection,
    filterType,
    setFilterType,
    setViewMode,
    isPlaying
  } = usePlayerStore();

  const filteredCollections = collections.filter((c) => {
    return filterType === 'all' || c.type === filterType;
  });

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-6">
      {/* Crate Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('player')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-muted)] hover:text-[var(--sleeve)] hover:border-[var(--brass)] transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Player</span>
          </button>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--sleeve)]">
              Vinyl Collection
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              {filteredCollections.length} record{filteredCollections.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              filterType === 'all'
                ? 'bg-[var(--brass)] text-black font-semibold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('album')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              filterType === 'album'
                ? 'bg-[var(--brass)] text-black font-semibold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            Albums
          </button>
          <button
            onClick={() => setFilterType('playlist')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              filterType === 'playlist'
                ? 'bg-[var(--brass)] text-black font-semibold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            Playlists
          </button>
        </div>
      </div>

      {/* Tactile Vinyl Sleeves Grid with Popping Vinyl Records */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 pt-4">
        {filteredCollections.map((col) => {
          const isCurrentlyActive = currentCollection?.id === col.id;

          return (
            <div
              key={col.id}
              onClick={() => {
                selectCollection(col, true);
                setViewMode('player');
              }}
              className="crate-sleeve-card group cursor-pointer flex flex-col"
            >
              {/* Sleeve + Popping Disc Container */}
              <div className="crate-sleeve-container">
                {/* Vinyl record disc tucked behind that smoothly pops out on hover */}
                <div className="crate-popout-disc">
                  {/* Center colored vinyl label */}
                  <div
                    className="crate-popout-label"
                    style={{ backgroundColor: col.dominantColor || '#C8A25A' }}
                  >
                    <div className="crate-popout-hole" />
                  </div>
                </div>

                {/* Front Cardboard Album Jacket */}
                <div className="crate-sleeve-jacket">
                  <img
                    src={col.coverUrl}
                    alt={col.title}
                    loading="eager"
                    className="w-full h-full object-cover select-none group-hover:scale-[1.03] transition-transform duration-300 block"
                  />

                  {/* Play overlay badge on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 backdrop-blur-[2px]">
                    <div className="w-11 h-11 rounded-full bg-[var(--brass)] text-black flex items-center justify-center shadow-2xl transform group-hover:scale-100 scale-75 transition-transform duration-200">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Active playing indicator badge */}
                  {isCurrentlyActive && (
                    <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded-full bg-[#080A0D]/90 border border-[var(--brass)] flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-[var(--brass)] ${isPlaying ? 'animate-ping' : ''}`} />
                      <span className="text-[9px] uppercase font-bold text-[var(--brass)]">
                        {isPlaying ? 'Playing' : 'Loaded'}
                      </span>
                    </div>
                  )}

                  {/* Year or Type tag */}
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-[#080A0D]/85 text-[9px] uppercase tracking-wider text-white border border-white/10 font-semibold backdrop-blur-sm">
                    {col.year || col.type}
                  </div>
                </div>
              </div>

              {/* Sleeve metadata underneath */}
              <div className="mt-3 space-y-0.5">
                <h3 className="font-display text-sm font-semibold text-[var(--sleeve)] line-clamp-1 group-hover:text-[var(--brass)] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                  {col.artist}
                </p>
                <p className="text-[10px] text-[var(--text-faint)] flex items-center gap-1.5 pt-0.5">
                  <span>{col.trackCount} tracks</span>
                  <span>•</span>
                  <span className="capitalize">{col.type}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
