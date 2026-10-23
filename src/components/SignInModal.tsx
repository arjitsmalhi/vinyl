import React, { useState, useEffect } from 'react';
import { X, Disc, ShieldCheck, AlertCircle, Copy, Check, ExternalLink, KeyRound } from 'lucide-react';
import { spotifyService } from '../services/spotify';
import { appleMusicService } from '../services/appleMusic';
import { usePlayerStore } from '../store/playerStore';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'spotify' | 'apple'>('spotify');
  const [spotifyClientId, setSpotifyClientId] = useState('');
  const [appleDevToken, setAppleDevToken] = useState('');
  const [copiedRedirect, setCopiedRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const { spotifyConnected, setSpotifyConnected } = usePlayerStore();

  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/` : 'http://127.0.0.1:5173/';

  useEffect(() => {
    if (isOpen) {
      setSpotifyClientId(spotifyService.getClientId());
      setAppleDevToken(appleMusicService.getDeveloperToken());
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyRedirect = () => {
    navigator.clipboard.writeText(redirectUri);
    setCopiedRedirect(true);
    setTimeout(() => setCopiedRedirect(false), 2000);
  };

  const handleSpotifyConnect = async () => {
    try {
      setErrorMessage(null);
      setIsConnecting(true);

      if (!spotifyClientId.trim()) {
        throw new Error('Please enter your Spotify Client ID from your Developer Dashboard.');
      }

      spotifyService.setClientId(spotifyClientId.trim());
      await spotifyService.redirectToAuth();
    } catch (e: any) {
      setIsConnecting(false);
      setErrorMessage(e.message || 'Failed to initialize Spotify sign-in.');
    }
  };

  const handleAppleMusicConnect = async () => {
    try {
      setErrorMessage(null);
      setIsConnecting(true);

      if (!appleDevToken.trim()) {
        throw new Error('Please enter your Apple Music Developer Token (ES256 signed JWT).');
      }

      appleMusicService.setDeveloperToken(appleDevToken.trim());
      const userToken = await appleMusicService.authorize();
      if (userToken) {
        setIsConnecting(false);
        onClose();
      }
    } catch (e: any) {
      setIsConnecting(false);
      setErrorMessage(e.message || 'Failed to authenticate with Apple MusicKit.');
    }
  };

  const handleSignOutSpotify = async () => {
    await spotifyService.signOut();
    setSpotifyConnected(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-faint)] hover:text-[var(--sleeve)] hover:bg-[#161D24] transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#050608] border border-[var(--brass)] mx-auto flex items-center justify-center mb-3 shadow-md">
            <Disc className="w-6 h-6 text-[var(--brass)]" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--sleeve)]">
            Connect Streaming Service
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed max-w-sm mx-auto">
            Spindle connects directly to your personal streaming account. Official SDKs stream music without saving or downloading audio.
          </p>
        </div>

        {/* Service Switcher Tabs */}
        <div className="flex rounded-xl bg-[#080A0D] border border-[#232B34] p-1 mb-5">
          <button
            onClick={() => { setActiveTab('spotify'); setErrorMessage(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'spotify'
                ? 'bg-[#1C2530] text-[#1DB954] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            Spotify
          </button>
          <button
            onClick={() => { setActiveTab('apple'); setErrorMessage(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'apple'
                ? 'bg-[#1C2530] text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--sleeve)]'
            }`}
          >
            Apple Music
          </button>
        </div>

        {/* Error notification alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-[#24100C] border border-[#7C2D12] text-amber-200 text-xs flex items-start gap-2 leading-relaxed">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* TAB 1: SPOTIFY */}
        {activeTab === 'spotify' && (
          <div className="space-y-4">
            {spotifyConnected ? (
              <div className="p-4 rounded-xl bg-[#081810] border border-[#1E4D3B] text-center space-y-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mx-auto animate-ping" />
                <p className="text-xs text-emerald-200 font-medium">
                  Your Spotify account is connected! Your playlists and library are synced.
                </p>
                <button
                  onClick={handleSignOutSpotify}
                  className="px-4 py-2 rounded-lg bg-[#0E1216] border border-[#232B34] text-xs text-red-300 hover:bg-[#181D24]"
                >
                  Disconnect Spotify
                </button>
              </div>
            ) : (
              <>
                {/* Client ID Input */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--sleeve)] mb-1.5 flex items-center justify-between">
                    <span>Spotify Client ID</span>
                    <a
                      href="https://developer.spotify.com/dashboard"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--brass)] hover:underline flex items-center gap-1 font-normal capitalize"
                    >
                      Get one here <ExternalLink className="w-3 h-3" />
                    </a>
                  </label>
                  <input
                    type="text"
                    value={spotifyClientId}
                    onChange={(e) => setSpotifyClientId(e.target.value)}
                    placeholder="e.g. 4d7f9a12c8b04312891d4e..."
                    className="modal-input"
                  />
                </div>

                {/* Redirect URI Display with Copy Button */}
                <div className="p-3 rounded-lg bg-[#080A0D] border border-[#1E252D]">
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1">
                    <span>Required Redirect URI in Spotify Dashboard:</span>
                    <button
                      onClick={handleCopyRedirect}
                      className="text-[var(--brass)] hover:underline flex items-center gap-1 font-mono text-[10px]"
                    >
                      {copiedRedirect ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy URI
                        </>
                      )}
                    </button>
                  </div>
                  <code className="block font-mono text-xs text-[var(--sleeve)] break-all select-all">
                    {redirectUri}
                  </code>
                </div>

                {/* Connect button */}
                <button
                  onClick={handleSpotifyConnect}
                  disabled={isConnecting}
                  className="btn-spotify"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.304c-.216.353-.676.467-1.03.25-2.825-1.726-6.38-2.116-10.567-1.16-.403.093-.807-.16-.9-.564-.093-.404.16-.807.564-.9 4.582-1.047 8.52-.603 11.683 1.344.354.217.468.676.25 1.03zm1.468-3.262c-.272.443-.854.583-1.296.312-3.234-1.988-8.163-2.564-11.987-1.403-.497.15-1.025-.133-1.176-.63-.152-.497.132-1.025.63-1.177 4.372-1.326 9.8-0.686 13.517 1.602.443.272.583.854.312 1.296zm.126-3.41c-3.878-2.302-10.28-2.515-13.987-1.388-.593.18-1.223-.155-1.403-.748-.18-.593.155-1.223.748-1.404 4.26-1.294 11.327-1.047 15.787 1.597.533.316.708 1.008.392 1.541-.316.533-1.008.708-1.541.392z" />
                  </svg>
                  <span>{isConnecting ? 'Opening Spotify Auth...' : 'Continue with Spotify'}</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* TAB 2: APPLE MUSIC */}
        {activeTab === 'apple' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--sleeve)] mb-1.5">
                Apple Music Developer Token (JWT)
              </label>
              <textarea
                rows={3}
                value={appleDevToken}
                onChange={(e) => setAppleDevToken(e.target.value)}
                placeholder="Paste your ES256 signed developer token from the Apple Developer Program..."
                className="modal-input font-mono text-xs"
              />
              <p className="text-[10px] text-[var(--text-faint)] mt-1">
                Requires an active Apple Developer Program membership to generate MusicKit keys.
              </p>
            </div>

            <button
              onClick={handleAppleMusicConnect}
              disabled={isConnecting}
              className="btn-apple"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.61.71-1.14 1.87-1 2.99 1.08.08 2.18-.54 2.84-1.35z"/>
              </svg>
              <span>{isConnecting ? 'Authorizing MusicKit...' : 'Continue with Apple Music'}</span>
            </button>
          </div>
        )}

        {/* Subscription Requirement Note from Section 0 & 4 */}
        <div className="mt-5 pt-4 border-t border-[#1C232B] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[var(--brass)] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            Spindle plays music through Spotify Premium or Apple Music subscriptions. You can also explore the curated analog crate in demo mode right now.
          </p>
        </div>

        {/* Dismiss to Demo Mode */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 text-xs text-[var(--text-faint)] hover:text-[var(--sleeve)] transition-colors text-center"
        >
          Return to Listening Room (Demo Mode)
        </button>
      </div>
    </div>
  );
};
