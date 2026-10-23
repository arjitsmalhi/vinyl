export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationMs: number;
  audioUrl?: string; // Preview or demo audio stream
  trackNumber: number;
  uri?: string; // Spotify URI
}

export interface Collection {
  id: string;
  title: string;
  artist: string;
  type: 'playlist' | 'album';
  coverUrl: string;
  dominantColor: string;
  year?: number;
  trackCount: number;
  tracks: Track[];
  description?: string;
  uri?: string;
}

export interface PlayerState {
  currentCollection: Collection | null;
  currentTrackIndex: number;
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  crackleEnabled: boolean;
  crackleVolume: number;
  isTonearmDown: boolean;
  viewMode: 'crate' | 'player';
  searchQuery: string;
  filterType: 'all' | 'playlist' | 'album';
  provider: 'demo' | 'spotify' | 'apple';
  spotifyConnected: boolean;
  userProductTier?: 'free' | 'premium' | 'unknown';
}

export interface MusicProvider {
  id: 'spotify' | 'apple' | 'demo';
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  isSubscriber(): Promise<boolean>;
  getPlaylists(): Promise<Collection[]>;
  getAlbums(): Promise<Collection[]>;
  getTracks(collectionId: string): Promise<Track[]>;
  play(collectionId: string, trackIndex: number): Promise<void>;
  pause(): void;
  resume(): void;
  next(): void;
  previous(): void;
  seek(ms: number): void;
  setVolume(v: number): void;
  onState(cb: (s: Partial<PlayerState>) => void): () => void;
}
