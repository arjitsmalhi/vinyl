import { Collection, Track } from '../types';

/**
 * Spotify Web API & Web Playback SDK with PKCE Authentication.
 */

const SPOTIFY_SCOPES = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-read-playback-state',
  'user-modify-playback-state'
].join(' ');

// Generate cryptographic random string for PKCE code verifier
function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

// SHA-256 hash for PKCE challenge
async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

// Base64-URL encode
function base64encode(input: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export class SpotifyService {
  private clientId: string = '';
  private redirectUri: string;
  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;
  private player: any = null;
  private deviceId: string | null = null;

  constructor() {
    this.redirectUri = (import.meta as unknown as { env: Record<string, string> }).env.VITE_SPOTIFY_REDIRECT_URI || `${window.location.origin}/`;
    this.loadConfig();
  }

  private loadConfig(): void {
    const envClientId = (import.meta as unknown as { env: Record<string, string> }).env.VITE_SPOTIFY_CLIENT_ID;
    const storedClientId = typeof localStorage !== 'undefined' ? localStorage.getItem('spindle_spotify_client_id') : null;
    this.clientId = storedClientId || envClientId || '';

    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('spindle_spotify_token') : null;
    const expires = typeof localStorage !== 'undefined' ? localStorage.getItem('spindle_spotify_expires_at') : null;
    if (token && expires) {
      this.accessToken = token;
      this.tokenExpiresAt = parseInt(expires, 10);
    }
  }

  public setClientId(clientId: string): void {
    this.clientId = clientId.trim();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('spindle_spotify_client_id', this.clientId);
    }
  }

  public getClientId(): string {
    return this.clientId;
  }

  public getRedirectUri(): string {
    return this.redirectUri;
  }

  public isAuthenticated(): boolean {
    return !!this.accessToken && Date.now() < this.tokenExpiresAt;
  }

  public async redirectToAuth(): Promise<void> {
    if (!this.clientId) {
      throw new Error('Spotify Client ID is required. Please paste your Client ID into the field below.');
    }

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.sessionStorage.setItem('spotify_code_verifier', codeVerifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope: SPOTIFY_SCOPES,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: this.redirectUri
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  public async handleCallback(): Promise<boolean> {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      console.error('Spotify Auth error:', error);
      return false;
    }

    if (!code) return false;

    const codeVerifier = window.sessionStorage.getItem('spotify_code_verifier');
    if (!codeVerifier) {
      console.warn('Code verifier missing from session storage');
      return false;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: this.clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri,
          code_verifier: codeVerifier
        })
      });

      const data = await response.json();
      if (data.access_token) {
        this.accessToken = data.access_token;
        this.tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
        localStorage.setItem('spindle_spotify_token', this.accessToken!);
        localStorage.setItem('spindle_spotify_expires_at', this.tokenExpiresAt.toString());
        if (data.refresh_token) {
          localStorage.setItem('spindle_spotify_refresh_token', data.refresh_token);
        }

        // Clean query parameters from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        this.initWebPlaybackSDK();
        return true;
      } else {
        console.error('Spotify token exchange failed:', data);
      }
    } catch (e) {
      console.error('Failed to exchange Spotify authorization code:', e);
    }
    return false;
  }

  public async getUserProfile(): Promise<{ id: string; product: string; display_name: string }> {
    const res = await this.fetchWithAuth('https://api.spotify.com/v1/me');
    return res.json();
  }

  public async checkPremium(): Promise<boolean> {
    try {
      const profile = await this.getUserProfile();
      return profile.product === 'premium';
    } catch {
      return false;
    }
  }

  public async getUserPlaylists(): Promise<Collection[]> {
    try {
      const res = await this.fetchWithAuth('https://api.spotify.com/v1/me/playlists?limit=25');
      const data = await res.json();
      return (data.items || []).map((p: any) => ({
        id: `spotify-${p.id}`,
        title: p.name,
        artist: p.owner?.display_name || 'Spotify Library',
        type: 'playlist' as const,
        coverUrl: p.images?.[0]?.url || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%231DB954\'/%3E%3C/svg%3E',
        dominantColor: '#1DB954',
        trackCount: p.tracks?.total || 0,
        description: p.description || 'Imported Spotify Playlist',
        uri: p.uri,
        tracks: []
      }));
    } catch (e) {
      console.error('Failed to load Spotify playlists:', e);
      return [];
    }
  }

  public async getPlaylistTracks(playlistId: string): Promise<Track[]> {
    const realId = playlistId.replace('spotify-', '');
    try {
      const res = await this.fetchWithAuth(`https://api.spotify.com/v1/playlists/${realId}/tracks?limit=50`);
      const data = await res.json();
      return (data.items || [])
        .filter((i: any) => i.track && i.track.id)
        .map((i: any, index: number) => ({
          id: i.track.id,
          title: i.track.name,
          artist: i.track.artists?.map((a: any) => a.name).join(', ') || 'Unknown Artist',
          album: i.track.album?.name || 'Spotify Album',
          durationMs: i.track.duration_ms,
          audioUrl: i.track.preview_url,
          trackNumber: index + 1,
          uri: i.track.uri
        }));
    } catch (e) {
      console.error('Failed to load Spotify playlist tracks:', e);
      return [];
    }
  }

  public initWebPlaybackSDK(): void {
    if (typeof window === 'undefined') return;
    if (!(window as any).Spotify) {
      // SDK script loads asynchronously
      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        this.setupPlayer();
      };
      return;
    }
    this.setupPlayer();
  }

  private setupPlayer(): void {
    if (!this.accessToken || !(window as any).Spotify) return;

    this.player = new (window as any).Spotify.Player({
      name: 'Spindle Vinyl Turntable',
      getOAuthToken: (cb: (token: string) => void) => {
        cb(this.accessToken!);
      },
      volume: 0.8
    });

    this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
      this.deviceId = device_id;
      console.log('Spindle Turntable Spotify Device Ready:', device_id);
    });

    this.player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
      console.warn('Spindle Turntable device offline:', device_id);
    });

    this.player.connect();
  }

  public async playSpotifyUri(contextUri: string, trackUri?: string): Promise<void> {
    if (!this.deviceId) return;
    const body: any = {};
    if (contextUri.startsWith('spotify:playlist:') || contextUri.startsWith('spotify:album:')) {
      body.context_uri = contextUri;
      if (trackUri) {
        body.offset = { uri: trackUri };
      }
    } else if (trackUri) {
      body.uris = [trackUri];
    }

    await this.fetchWithAuth(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  }

  public async signOut(): Promise<void> {
    this.accessToken = null;
    this.tokenExpiresAt = 0;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('spindle_spotify_token');
      localStorage.removeItem('spindle_spotify_expires_at');
      localStorage.removeItem('spindle_spotify_refresh_token');
    }
    if (this.player) {
      try {
        this.player.disconnect();
      } catch {
        // ignore
      }
      this.player = null;
    }
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Spotify');
    }

    const headers = new Headers(options.headers || {});
    headers.set('Authorization', `Bearer ${this.accessToken}`);

    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      await this.signOut();
      throw new Error('Spotify session expired. Please sign in again.');
    }
    return res;
  }
}

export const spotifyService = new SpotifyService();
