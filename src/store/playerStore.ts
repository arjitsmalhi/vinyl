import { create } from 'zustand';
import { Collection, Track, PlayerState, RoomTheme } from '../types';
import { MOCK_COLLECTIONS } from '../data/mockCollections';
import { audioEngine } from '../utils/audioEngine';
import { extractDominantColor } from '../utils/colorExtractor';

interface PlayerStore extends PlayerState {
  collections: Collection[];
  isDiscSwapping: boolean;
  discSwapDirection: 'next' | 'prev';
  isDraggingTonearm: boolean;
  tonearmAngle: number; // 18 deg at start, 34 deg at end, 10 deg when lifted off

  // Actions
  initialize: () => void;
  selectCollection: (col: Collection, autoPlay?: boolean) => void;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (ms: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  toggleCrackle: () => void;
  setCrackleVolume: (v: number) => void;
  setViewMode: (mode: 'crate' | 'player') => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (filter: 'all' | 'playlist' | 'album') => void;
  setTonearmDragging: (isDragging: boolean) => void;
  setTonearmAngle: (angle: number) => void;
  setSpotifyConnected: (connected: boolean) => void;
  setCollections: (collections: Collection[]) => void;
  setCrateLayout: (layout: 'stack' | 'grid') => void;
  setRoomTheme: (theme: 'dark' | 'light' | 'dynamic' | 'amber' | 'ivory' | 'forest' | 'midnight') => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  collections: MOCK_COLLECTIONS,
  currentCollection: MOCK_COLLECTIONS[0],
  currentTrackIndex: 0,
  isPlaying: false,
  isTonearmDown: false,
  progressMs: 0,
  durationMs: MOCK_COLLECTIONS[0].tracks[0]?.durationMs || 180000,
  volume: 0.85,
  isMuted: false,
  isShuffle: false,
  repeatMode: 'off',
  crackleEnabled: true,
  crackleVolume: 0.25,
  viewMode: 'player', // Default directly to the vinyl player
  crateLayout: 'grid', // Default to clean cover with peeking popping vinyl
  roomTheme: 'dark', // Clean dark mode by default
  searchQuery: '',
  filterType: 'all',
  provider: 'demo',
  spotifyConnected: false,
  userProductTier: 'unknown',
  isDiscSwapping: false,
  discSwapDirection: 'next',
  isDraggingTonearm: false,
  tonearmAngle: 10,

  initialize: () => {
    const { currentCollection, currentTrackIndex, volume, crackleEnabled, crackleVolume } = get();

    // Hook audio engine callbacks
    audioEngine.setCallbacks(
      (timeMs, durationMs) => {
        const state = get();
        if (state.isDraggingTonearm) return;

        const effectiveDuration = durationMs > 0 ? durationMs : state.durationMs;
        const progressRatio = effectiveDuration > 0 ? Math.min(1, timeMs / effectiveDuration) : 0;
        // Map ratio: 18 deg at start (outer groove) to 34 deg at end (runout groove)
        const computedAngle = 18 + progressRatio * 16;

        set({
          progressMs: timeMs,
          durationMs: effectiveDuration,
          tonearmAngle: computedAngle
        });
      },
      () => {
        get().nextTrack();
      }
    );

    // Initial audio setup
    if (currentCollection && currentCollection.tracks[currentTrackIndex]?.audioUrl) {
      // Prepared but not playing yet
    }

    if (crackleEnabled) {
      audioEngine.startCrackle(crackleVolume);
    }
  },

  setCollections: (collections: Collection[]) => {
    set({ collections });
  },

  selectCollection: async (col: Collection, autoPlay = true) => {
    let activeCol = { ...col };

    // If Spotify playlist has no tracks yet, fetch them live
    if (activeCol.tracks.length === 0 && activeCol.id.startsWith('spotify-')) {
      try {
        const { spotifyService } = await import('../services/spotify');
        const tracks = await spotifyService.getPlaylistTracks(activeCol.id);
        activeCol.tracks = tracks;
        activeCol.trackCount = tracks.length;
      } catch (e) {
        console.warn('Failed to load live Spotify tracks:', e);
      }
    }

    // Extract dominant color if not present or apply dynamically
    let dominantColor = activeCol.dominantColor;
    if (activeCol.coverUrl && !activeCol.coverUrl.startsWith('data:')) {
      try {
        dominantColor = await extractDominantColor(activeCol.coverUrl);
      } catch (e) {
        // keep existing
      }
    }

    // Apply color to CSS document root
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--accent', dominantColor);
    }

    set({
      currentCollection: { ...activeCol, dominantColor },
      currentTrackIndex: 0,
      progressMs: 0,
      durationMs: activeCol.tracks[0]?.durationMs || 180000,
      viewMode: 'player'
    });

    if (autoPlay && activeCol.tracks.length > 0) {
      setTimeout(() => {
        get().playTrack(0);
      }, 400);
    }
  },

  playTrack: (index: number) => {
    const { currentCollection, volume, isMuted, crackleEnabled, crackleVolume } = get();
    if (!currentCollection || !currentCollection.tracks[index]) return;

    const track = currentCollection.tracks[index];

    // Lift tonearm briefly for drop animation
    set({
      currentTrackIndex: index,
      progressMs: 0,
      durationMs: track.durationMs,
      isTonearmDown: false,
      tonearmAngle: 12
    });

    // Start crackle if enabled
    if (crackleEnabled) {
      audioEngine.startCrackle(crackleVolume);
    }

    // Lower tonearm onto the record and spin up audio
    setTimeout(() => {
      set({
        isPlaying: true,
        isTonearmDown: true,
        tonearmAngle: 18 // Start groove
      });

      if (track.audioUrl) {
        audioEngine.loadAndPlay(track.audioUrl, isMuted ? 0 : volume);
      }
    }, 450);
  },

  togglePlay: () => {
    const { isPlaying, currentCollection, currentTrackIndex, volume, isMuted, crackleEnabled, crackleVolume } = get();
    if (!currentCollection) return;

    if (isPlaying) {
      // Pause: lift tonearm and spin down
      set({
        isPlaying: false,
        isTonearmDown: false,
        tonearmAngle: 10
      });
      audioEngine.pause();
    } else {
      // Resume: lower tonearm and resume spin
      if (crackleEnabled) {
        audioEngine.startCrackle(crackleVolume);
      }
      set({
        isPlaying: true,
        isTonearmDown: true,
        tonearmAngle: 18 + (get().progressMs / (get().durationMs || 1)) * 16
      });
      const track = currentCollection.tracks[currentTrackIndex];
      if (track?.audioUrl) {
        audioEngine.play();
      }
    }
  },

  nextTrack: () => {
    const { currentCollection, currentTrackIndex } = get();
    if (!currentCollection) return;

    const nextIndex = (currentTrackIndex + 1) % currentCollection.tracks.length;

    // Disc slide-swap animation
    set({
      isDiscSwapping: true,
      discSwapDirection: 'next',
      isTonearmDown: false,
      tonearmAngle: 10
    });

    audioEngine.pause();

    setTimeout(() => {
      set({ isDiscSwapping: false });
      get().playTrack(nextIndex);
    }, 500);
  },

  prevTrack: () => {
    const { currentCollection, currentTrackIndex, progressMs } = get();
    if (!currentCollection) return;

    // If more than 3 seconds in, restart track
    if (progressMs > 3000) {
      get().seek(0);
      return;
    }

    const prevIndex = (currentTrackIndex - 1 + currentCollection.tracks.length) % currentCollection.tracks.length;

    set({
      isDiscSwapping: true,
      discSwapDirection: 'prev',
      isTonearmDown: false,
      tonearmAngle: 10
    });

    audioEngine.pause();

    setTimeout(() => {
      set({ isDiscSwapping: false });
      get().playTrack(prevIndex);
    }, 500);
  },

  seek: (ms: number) => {
    const { durationMs, isPlaying } = get();
    const clampedMs = Math.max(0, Math.min(ms, durationMs));
    const ratio = durationMs > 0 ? clampedMs / durationMs : 0;
    const computedAngle = 18 + ratio * 16;

    audioEngine.seek(clampedMs);
    set({
      progressMs: clampedMs,
      tonearmAngle: isPlaying ? computedAngle : 10
    });
  },

  setVolume: (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    audioEngine.setVolume(clamped);
    set({ volume: clamped, isMuted: false });
  },

  toggleMute: () => {
    const { isMuted, volume } = get();
    if (isMuted) {
      audioEngine.setVolume(volume);
      set({ isMuted: false });
    } else {
      audioEngine.setVolume(0);
      set({ isMuted: true });
    }
  },

  toggleCrackle: () => {
    const { crackleEnabled, crackleVolume, isPlaying } = get();
    const nextState = !crackleEnabled;
    set({ crackleEnabled: nextState });

    if (nextState && isPlaying) {
      audioEngine.startCrackle(crackleVolume);
    } else {
      audioEngine.stopCrackle();
    }
  },

  setCrackleVolume: (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    audioEngine.setCrackleVolume(clamped);
    set({ crackleVolume: clamped });
  },

  setViewMode: (mode: 'crate' | 'player') => {
    set({ viewMode: mode });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setFilterType: (filter: 'all' | 'playlist' | 'album') => {
    set({ filterType: filter });
  },

  setTonearmDragging: (isDragging: boolean) => {
    set({ isDraggingTonearm: isDragging });
  },

  setTonearmAngle: (angle: number) => {
    const clamped = Math.max(18, Math.min(34, angle));
    const ratio = (clamped - 18) / 16;
    const ms = ratio * get().durationMs;
    set({ tonearmAngle: clamped });
    audioEngine.seek(ms);
  },

  setSpotifyConnected: (connected: boolean) => {
    set({ spotifyConnected: connected });
  },

  setCrateLayout: (layout: 'stack' | 'grid') => {
    set({ crateLayout: layout });
  },

  setRoomTheme: (theme: RoomTheme) => {
    set({ roomTheme: theme });
  }
}));

