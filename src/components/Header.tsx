import React from 'react';
import { usePlayerStore } from '../store/playerStore';
import { Disc, Sun, Moon, ListMusic, LogIn } from 'lucide-react';

interface HeaderProps {
  onOpenSignIn: () => void;
  showQueue: boolean;
  onToggleQueue: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSignIn,
  showQueue,
  onToggleQueue
}) => {
  const {
    viewMode,
    setViewMode,
    roomTheme,
    setRoomTheme,
    currentCollection,
    spotifyConnected
  } = usePlayerStore();

  const isLight = roomTheme === 'light';

  const toggleTheme = () => {
    setRoomTheme(isLight ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-header)] backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: Minimal navigation controls (No brand name on top left as requested) */}
      <div className="flex items-center gap-2">
        {/* Toggle between Vinyl Player and Vinyl Archive */}
        <button
          onClick={() => setViewMode(viewMode === 'crate' ? 'player' : 'crate')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all shadow-sm ${
            viewMode === 'crate'
              ? 'bg-[var(--brass)] text-black border-[var(--brass)] font-semibold'
              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--sleeve)] hover:border-[var(--brass)]'
          }`}
          title="Browse Playlists & Vinyl Records"
        >
          <Disc className="w-3.5 h-3.5" />
          <span>{viewMode === 'crate' ? 'Back to Player' : 'Vinyl Selection'}</span>
        </button>

        {/* Queue Toggle Button */}
        <button
          onClick={onToggleQueue}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all shadow-sm ${
            showQueue
              ? 'bg-[var(--brass)] text-black border-[var(--brass)] font-semibold'
              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--sleeve)] hover:border-[var(--brass)]'
          }`}
          title="View Queue of Songs"
        >
          <ListMusic className="w-3.5 h-3.5" />
          <span>Queue</span>
          {currentCollection && (
            <span className="text-[10px] opacity-75 font-mono">
              ({currentCollection.tracks.length})
            </span>
          )}
        </button>
      </div>

      {/* Right: Light/Dark Mode Switcher & Minimalist Sign-in */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Clean Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--sleeve)] hover:border-[var(--brass)] transition-all shadow-sm"
          title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
        >
          {isLight ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
              <span>Dark</span>
            </>
          )}
        </button>

        {/* Minimal Connect / Sign In */}
        <button
          onClick={onOpenSignIn}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--sleeve)] hover:border-[var(--brass)] transition-all shadow-sm"
          title={spotifyConnected ? 'Spotify Connected' : 'Connect Music Service'}
        >
          {spotifyConnected ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
              <span className="hidden sm:inline">Spotify</span>
            </>
          ) : (
            <>
              <LogIn className="w-3.5 h-3.5 text-[var(--brass)]" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
