/**
 * Apple MusicKit JS v3 integration for Spindle
 */

export class AppleMusicService {
  private developerToken: string = '';
  private isConfigured: boolean = false;

  constructor() {
    const envToken = (import.meta as unknown as { env: Record<string, string> }).env.VITE_APPLE_MUSIC_DEVELOPER_TOKEN;
    const storedToken = typeof localStorage !== 'undefined' ? localStorage.getItem('spindle_apple_developer_token') : null;
    this.developerToken = storedToken || envToken || '';
  }

  public setDeveloperToken(token: string): void {
    this.developerToken = token.trim();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('spindle_apple_developer_token', this.developerToken);
    }
  }

  public getDeveloperToken(): string {
    return this.developerToken;
  }

  public async initialize(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    if (!(window as any).MusicKit) return false;
    if (!this.developerToken) return false;

    try {
      await (window as any).MusicKit.configure({
        developerToken: this.developerToken,
        app: {
          name: 'Spindle',
          build: '1.0.0'
        }
      });
      this.isConfigured = true;
      return true;
    } catch (e) {
      console.error('Apple MusicKit configuration error:', e);
      return false;
    }
  }

  public async authorize(): Promise<string | null> {
    const initialized = await this.initialize();
    if (!initialized) {
      throw new Error('Apple Music requires a Developer Token (ES256 signed JWT). Please enter your Developer Token.');
    }

    const music = (window as any).MusicKit.getInstance();
    const userToken = await music.authorize();
    return userToken;
  }

  public isAuthorized(): boolean {
    if (typeof window === 'undefined' || !(window as any).MusicKit) return false;
    try {
      const music = (window as any).MusicKit.getInstance();
      return music && music.isAuthorized;
    } catch {
      return false;
    }
  }

  public async signOut(): Promise<void> {
    if (typeof window === 'undefined' || !(window as any).MusicKit) return;
    try {
      const music = (window as any).MusicKit.getInstance();
      if (music) {
        await music.unauthorize();
      }
    } catch {
      // ignore
    }
  }
}

export const appleMusicService = new AppleMusicService();
