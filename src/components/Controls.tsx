import React, { useEffect } from 'react';
import { usePlayerStore } from '../store/playerStore';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  Sparkles,
  ListMusic
} from 'lucide-react';

interface ControlsProps {
  showTrackList?: boolean;
  onToggleTrackList?: () => void;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export const Controls: React.FC<ControlsProps> = ({ showTrackList, onToggleTrackList }) => {
  const {
    currentCollection,
    currentTrackIndex,
    isPlaying,
    progressMs,
    durationMs,
    volume,
    isMuted,
    crackleEnabled,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    toggleCrackle
  } = usePlayerStore();

  const currentTrack = currentCollection?.tracks[currentTrackIndex];

  // Spacebar and arrow keys keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextTrack();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevTrack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextTrack, prevTrack]);

  const progressPercent = durationMs > 0 ? (progressMs / durationMs) * 100 : 0;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 flex flex-col gap-4">
      {/* Current Playing Track Info (Minimalist Left-Aligned from Reference Image 2) */}
      <div className="w-full text-left">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--sleeve)] tracking-tight line-clamp-1">
          {currentTrack ? currentTrack.title : 'No Record Selected'}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium mt-0.5 line-clamp-1">
          {currentTrack ? `${currentTrack.artist} • ${currentTrack.album}` : 'Pull an album from the crate to begin'}
        </p>
      </div>

      {/* Scrubbable Seek Bar & Timestamps */}
      <div className="w-full flex items-center gap-3">
        <span className="font-mono text-[11px] text-[var(--text-faint)] w-10 text-right tabular-nums">
          {formatTime(progressMs)}
        </span>

        <div className="relative flex-1 group">
          <input
            type="range"
            min={0}
            max={durationMs || 1000}
            value={progressMs}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-[#181E25] cursor-pointer accent-[var(--brass)] focus:outline-none"
            style={{
              background: `linear-gradient(to right, var(--brass) ${progressPercent}%, #181E25 ${progressPercent}%)`
            }}
          />
        </div>

        <span className="font-mono text-[11px] text-[var(--text-faint)] w-10 text-left tabular-nums">
          {formatTime(durationMs)}
        </span>
      </div>

      {/* Transport Controls (Clean & Minimalist) */}
      <div className="flex items-center justify-between mt-1">
        {/* Vinyl crackle toggle */}
        <button
          onClick={toggleCrackle}
          className={`p-2 rounded-full border transition-all ${
            crackleEnabled
              ? 'text-[var(--brass)] bg-[#10241D] border-[var(--brass)] shadow-[0_0_10px_rgba(200,162,90,0.25)]'
              : 'text-[var(--text-faint)] bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:text-[var(--sleeve)]'
          }`}
          title="Toggle vinyl crackle & surface noise"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Center: Previous, Play/Pause, Next */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={prevTrack}
            className="p-2.5 rounded-full text-[var(--sleeve)] hover:text-[var(--brass)] transition-all transform active:scale-95"
            title="Previous Track / Swap Disc Right (Left Arrow)"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[var(--brass)] text-[#050608] flex items-center justify-center shadow-[0_6px_20px_rgba(200,162,90,0.4)] hover:scale-105 active:scale-95 transition-all focus:outline-none"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 ml-0.5 fill-current" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-2.5 rounded-full text-[var(--sleeve)] hover:text-[var(--brass)] transition-all transform active:scale-95"
            title="Next Track / Swap Disc Left (Right Arrow)"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Right: Volume & Queue of songs toggle */}
        <div className="flex items-center gap-2">
          {onToggleTrackList && (
            <button
              onClick={onToggleTrackList}
              className={`p-2 rounded-full border text-xs font-medium transition-all ${
                showTrackList
                  ? 'bg-[var(--brass)] text-black border-[var(--brass)] shadow-md'
                  : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--sleeve)]'
              }`}
              title="Toggle Song Queue"
            >
              <ListMusic className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 text-[var(--text-muted)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-2.5 py-1.5 rounded-full">
            <button
              onClick={toggleMute}
              className="hover:text-[var(--sleeve)] transition-colors"
              title="Mute / Unmute"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-14 h-1 rounded-full cursor-pointer accent-[var(--brass)]"
              title="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
