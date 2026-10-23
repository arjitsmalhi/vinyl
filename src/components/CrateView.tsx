import React, { useState } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { Disc, Layers, LayoutGrid, Play, Music } from 'lucide-react';

export const CrateView: React.FC = () => {
  const {
    collections,
    currentCollection,
    selectCollection,
    searchQuery,
    filterType,
    setFilterType,
    crateLayout,
    setCrateLayout,
    isPlaying
  } = usePlayerStore();

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filteredCollections = collections.filter((c) => {
    const matchesFilter = filterType === 'all' || c.type === filterType;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
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

        {/* View Layout Toggle & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 3D Stack / Grid View Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0E1216] border border-[#202730]">
            <button
              onClick={() => setCrateLayout('stack')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                crateLayout === 'stack'
                  ? 'bg-[#1C242E] text-[var(--brass)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
              }`}
              title="3D Stack View with Dynamic Gradients & Accordion Hover"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Stack</span>
            </button>
            <button
              onClick={() => setCrateLayout('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                crateLayout === 'grid'
                  ? 'bg-[#1C242E] text-[var(--brass)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
              }`}
              title="Classic Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0E1216] border border-[#202730]">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterType === 'all'
                  ? 'bg-[#1C242E] text-[var(--sleeve)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
              }`}
            >
              All
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
      </div>

      {/* Empty State */}
      {filteredCollections.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-[#202730] bg-[#0E1216]">
          <Disc className="w-10 h-10 mx-auto text-[var(--text-faint)] mb-3 animate-spin" style={{ animationDuration: '6s' }} />
          <h3 className="font-display text-lg font-medium text-[var(--sleeve)]">No matching records</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mt-1">
            No vinyl sleeves match "{searchQuery}". Try searching for another artist or clear your filter.
          </p>
        </div>
      ) : crateLayout === 'stack' ? (
        /* ====================================================================
           MODE 1: 3D STACK WITH ACCORDION PUSH-APART ON HOVER & GRADIENTS
           ==================================================================== */
        <div className="crate-3d-stack-viewport">
          {filteredCollections.map((col, idx) => {
            const isCurrentlyActive = currentCollection?.id === col.id;
            const isHovered = hoveredIdx === idx;

            // Accordion push-apart math:
            // Items above push up, hovered item lifts, items below push down
            let translateY = 0;
            let translateZ = 0;
            let scale = 1;

            if (hoveredIdx !== null) {
              if (idx < hoveredIdx) {
                translateY = -85; // Pushed up generously to reveal hovered record
              } else if (idx === hoveredIdx) {
                translateY = 0;
                translateZ = 75; // Lifts forward toward viewer
                scale = 1.08;
              } else {
                translateY = 110; // Pushed down generously to eliminate overlap
              }
            }

            return (
              <div
                key={col.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => selectCollection(col, true)}
                className="crate-stack-card group"
                style={{
                  transform: `rotateX(28deg) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
                  zIndex: isHovered ? 99 : filteredCollections.length - idx,
                  transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease'
                }}
              >
                {/* Modern Card Face with Centered Art & Face Typography (No Side Spines) */}
                <div
                  className="crate-stack-face-modern"
                  style={{
                    background: `radial-gradient(circle at 50% 32%, ${col.dominantColor}55 0%, ${col.dominantColor}18 55%, #0B0E13 100%), linear-gradient(180deg, rgba(20, 26, 34, 0.95) 0%, #07090C 100%)`,
                    borderColor: isHovered ? col.dominantColor : 'rgba(255, 255, 255, 0.14)',
                    boxShadow: isHovered
                      ? `0 30px 65px rgba(0, 0, 0, 0.98), 0 0 35px ${col.dominantColor}55`
                      : '0 16px 36px rgba(0, 0, 0, 0.88)'
                  }}
                >
                  {/* Top Status & Year Pill */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${col.dominantColor}33`,
                        color: '#FFFFFF',
                        border: `1px solid ${col.dominantColor}66`
                      }}
                    >
                      {col.year || col.type}
                    </span>
                    {isCurrentlyActive && (
                      <span className="text-[10px] font-bold uppercase text-[var(--brass)] flex items-center gap-1 bg-[#10171F] px-2 py-0.5 rounded-full border border-[var(--brass)]/40">
                        <span className={`w-1.5 h-1.5 rounded-full bg-[var(--brass)] ${isPlaying ? 'animate-ping' : ''}`} />
                        {isPlaying ? 'Now Spinning' : 'Loaded'}
                      </span>
                    )}
                  </div>

                  {/* Centered Artwork Container directly in the center of the face */}
                  <div className="crate-centered-art relative group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={col.coverUrl}
                      alt={col.title}
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--brass)] text-black flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Centered Typography directly on the face */}
                  <div className="w-full px-4 flex flex-col items-center">
                    <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight truncate max-w-full drop-shadow-md">
                      {col.title}
                    </h3>
                    <p className="text-xs text-white/80 font-medium truncate max-w-full mt-0.5">
                      {col.artist}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-white/60">
                      <span>{col.trackCount} tracks</span>
                      <span>•</span>
                      <span className="capitalize">{col.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ====================================================================
           MODE 2: CLASSIC SLEEVE GRID
           ==================================================================== */
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

                  {/* Type tag */}
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
