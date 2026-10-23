import React, { useEffect, useState } from 'react';
import { usePlayerStore } from './store/playerStore';
import { Header } from './components/Header';
import { CrateView } from './components/CrateView';
import { Turntable } from './components/Turntable';
import { Controls } from './components/Controls';
import { TrackList } from './components/TrackList';
import { SignInModal } from './components/SignInModal';
import { spotifyService } from './services/spotify';
import { ArrowLeft, Play, Pause } from 'lucide-react';

export const App: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    currentCollection,
    currentTrackIndex,
    isPlaying,
    togglePlay,
    initialize,
    setSpotifyConnected
  } = usePlayerStore();

  const [isSignInOpen, setIsSignInOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-[#0A0C0E] text-[var(--sleeve)] relative">
      {/* Top Header */}
      <Header onOpenSignIn={() => setIsSignInOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center bg-[#0A0C0E]">
        {viewMode === 'crate' ? (
          <CrateView />
        ) : (
          <div className="w-full max-w-4xl px-4 py-6 sm:py-8 flex flex-col items-center">
            {/* Top Navigation Bar inside Player */}
            <div className="w-full flex items-center justify-between mb-4 sm:mb-6">
              <button
                onClick={() => setViewMode('crate')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1216] hover:bg-[#161D24] border border-[#202730] text-xs text-[var(--text-muted)] hover:text-[var(--sleeve)] transition-colors shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Crate</span>
              </button>

              <div className="flex items-center gap-2 text-right">
                <span className="text-xs uppercase tracking-wider text-[var(--brass)] font-semibold">
                  {currentCollection?.type}
                </span>
                <span className="text-xs text-[var(--text-faint)]">•</span>
                <span className="text-xs text-[var(--text-muted)] truncate max-w-[160px] sm:max-w-xs">
                  {currentCollection?.title}
                </span>
              </div>
            </div>

            {/* 3D Turntable Plinth */}
            <Turntable />

            {/* Turntable Player Controls */}
            <Controls />

            {/* Track List with mini spinning vinyl icons */}
            <TrackList />
          </div>
        )}
      </main>

      {/* Floating Mini Player if in Crate view and record is loaded */}
      {viewMode === 'crate' && currentCollection && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md bg-[#0C1014] border border-[#232B34] rounded-2xl p-2.5 sm:px-4 flex items-center justify-between gap-3 shadow-2xl">
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
              className="w-9 h-9 rounded-full bg-[var(--brass)] text-[#050608] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
            </button>
            <button
              onClick={() => setViewMode('player')}
              className="px-2.5 py-1.5 rounded-lg bg-[#18202A] text-xs text-[var(--sleeve)] hover:bg-[#202B38] transition-colors border border-[#263342]"
            >
              Turntable
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
