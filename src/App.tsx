import React, { useEffect, useState } from 'react';
import { usePlayerStore } from './store/playerStore';
import { Header } from './components/Header';
import { CrateView } from './components/CrateView';
import { Turntable } from './components/Turntable';
import { Controls } from './components/Controls';
import { TrackList } from './components/TrackList';
import { SignInModal } from './components/SignInModal';
import { spotifyService } from './services/spotify';
import { Play, Pause } from 'lucide-react';

export const App: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    currentCollection,
    currentTrackIndex,
    isPlaying,
    togglePlay,
    initialize,
    roomTheme,
    setSpotifyConnected
  } = usePlayerStore();

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  useEffect(() => {
    initialize();

    const syncLibrary = async () => {
      try {
        const playlists = await spotifyService.getUserPlaylists();
        if (playlists.length > 0) {
          const { MOCK_COLLECTIONS } = await import('./data/mockCollections');
          usePlayerStore.getState().setCollections([...playlists, ...MOCK_COLLECTIONS]);
        }
      } catch (err) {
        console.warn('Could not sync Spotify playlists:', err);
      }
    };

    // Check if returning from Spotify PKCE callback
    if (window.location.search.includes('code=')) {
      spotifyService.handleCallback().then((success) => {
        if (success) {
          setSpotifyConnected(true);
          syncLibrary();
        }
      });
    } else if (spotifyService.isAuthenticated()) {
      setSpotifyConnected(true);
      syncLibrary();
    }
  }, [initialize, setSpotifyConnected]);

  const currentTrack = currentCollection?.tracks[currentTrackIndex];

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-500 theme-${roomTheme}`}>
      {/* Ultra-Minimalist Header (No name on top left, light/dark toggle, queue button) */}
      <Header
        onOpenSignIn={() => setIsSignInOpen(true)}
        showQueue={showQueue}
        onToggleQueue={() => setShowQueue(!showQueue)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center px-4 py-4 sm:py-6">
        {viewMode === 'crate' ? (
          <CrateView />
        ) : (
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* 3D Vinyl Turntable Platter (Reference Images 1 & 2) */}
            <Turntable />

            {/* Minimalist Player Controls */}
            <Controls
              showTrackList={showQueue}
              onToggleTrackList={() => setShowQueue(!showQueue)}
            />

            {/* Queue of songs (Clean expandable song queue) */}
            {showQueue && (
              <div className="w-full max-w-xl mx-auto mt-4 animate-fadeIn">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-[var(--border-subtle)] text-xs text-[var(--text-muted)] font-medium">
                  <span className="uppercase tracking-wider font-semibold text-[var(--brass)]">
                    Upcoming Songs Queue
                  </span>
                  <span>
                    {currentCollection?.tracks.length || 0} track{currentCollection?.tracks.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <TrackList />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Mini Player ONLY if in Crate view */}
      {viewMode === 'crate' && currentCollection && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-full p-2 px-4 flex items-center justify-between gap-3 shadow-2xl backdrop-blur-md">
          <div
            onClick={() => setViewMode('player')}
            className="flex items-center gap-3 cursor-pointer group min-w-0"
          >
            <div className={`mini-vinyl ${isPlaying ? 'spinning' : ''} shrink-0`}>
              <div
                className="mini-vinyl-label"
                style={{ backgroundColor: currentCollection.dominantColor }}
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-[var(--sleeve)] truncate group-hover:text-[var(--brass)] transition-colors">
                {currentTrack?.title}
              </h4>
              <p className="text-[10px] text-[var(--text-muted)] truncate">
                {currentTrack?.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-[var(--brass)] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
            </button>
            <button
              onClick={() => setViewMode('player')}
              className="px-2.5 py-1 rounded-full border border-[var(--border-subtle)] text-[11px] text-[var(--sleeve)] hover:border-[var(--brass)] transition-colors"
            >
              Player
            </button>
          </div>
        </div>
      )}

      {/* Sign-in Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </div>
  );
};
