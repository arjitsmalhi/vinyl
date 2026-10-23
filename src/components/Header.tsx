import React from 'react';
import { usePlayerStore } from '../store/playerStore';
import { Disc3, Disc, Search, Sparkles, LogIn } from 'lucide-react';

interface HeaderProps {
  onOpenSignIn: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSignIn }) => {
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    crackleEnabled,
    toggleCrackle,
    spotifyConnected
  } = usePlayerStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1C232B] bg-[#07090C] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Brand & Monogram */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setViewMode(viewMode === 'player' ? 'crate' : 'player')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
          title="Toggle between Crate and Turntable"
        >
          <div className="w-8 h-8 rounded-full bg-[#050608] border border-[var(--brass)] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--brass)]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg tracking-tight font-bold text-[var(--sleeve)]">
                Spindle
              </span>
              <span className="text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#10241D] text-[#86EFAC] font-medium border border-[#1E4D3B]">
                Hi-Fi
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] -mt-0.5 hidden sm:block">
              The Vinyl Listening Room
            </p>
          </div>
        </button>

        {/* View Switcher Tabs */}
        <div className="hidden md:flex items-center ml-6 p-0.5 rounded-lg bg-[#0E1216] border border-[#202730] text-xs">
          <button
            onClick={() => setViewMode('crate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'crate'
                ? 'bg-[#1C242E] text-[var(--sleeve)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            The Crate
          </button>
          <button
            onClick={() => setViewMode('player')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'player'
                ? 'bg-[#1C242E] text-[var(--sleeve)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            <Disc3 className="w-3.5 h-3.5 text-[var(--brass)]" />
            Turntable
          </button>
        </div>
      </div>

      {/* Crate Search Filter */}
      <div className="relative flex-1 max-w-xs sm:max-w-sm hidden sm:block">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search records, artists, eras..."
          className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0E1216] border border-[#202730] text-xs text-[var(--sleeve)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--brass)] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[var(--text-faint)] hover:text-[var(--sleeve)]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Right controls: Crackle toggle + Spotify sign-in */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Vinyl crackle toggle */}
        <button
          onClick={toggleCrackle}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            crackleEnabled
              ? 'bg-[#10241D] border-[var(--brass)] text-[var(--sleeve)] shadow-[0_0_12px_rgba(200,162,90,0.2)]'
              : 'bg-[#0E1216] border-[#202730] text-[var(--text-faint)] hover:text-[var(--text-muted)]'
          }`}
          title="Toggle physical needle surface noise and dust crackle"
        >
          <Sparkles className={`w-3.5 h-3.5 ${crackleEnabled ? 'text-[var(--brass)] animate-spin' : ''}`} />
          <span className="hidden sm:inline">Vinyl Crackle</span>
          <span className={`w-1.5 h-1.5 rounded-full ${crackleEnabled ? 'bg-[var(--brass)]' : 'bg-transparent'}`} />
        </button>

        {/* Spotify / Account Connect */}
        <button
          onClick={onOpenSignIn}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0E1216] hover:bg-[#161D24] border border-[#202730] text-[var(--sleeve)] transition-all hover:border-[var(--brass)]"
        >
          {spotifyConnected ? (
            <>
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Spotify Synced</span>
            </>
          ) : (
            <>
              <LogIn className="w-3.5 h-3.5 text-[var(--brass)]" />
              <span>Connect Music</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
