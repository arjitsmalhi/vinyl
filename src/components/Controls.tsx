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
  Sparkles
} from 'lucide-react';

function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export const Controls: React.FC = () => {
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
    <div className="w-full max-w-xl mx-auto px-4 py-4 flex flex-col items-center gap-4">
      {/* Current Playing Track Info */}
      <div className="text-center w-full">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--sleeve)] tracking-tight line-clamp-1">
          {currentTrack ? currentTrack.title : 'No Record Selected'}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5 line-clamp-1">
          {currentTrack ? `${currentTrack.artist} — ${currentTrack.album}` : 'Pull an album from the crate to begin'}
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

      {/* Transport Controls */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-1">
        <button
          onClick={toggleCrackle}
          className={`p-2.5 rounded-full border transition-all ${
            crackleEnabled
              ? 'text-[var(--brass)] bg-[#10241D] border-[var(--brass)]'
              : 'text-[var(--text-faint)] bg-[#0E1216] border-[#202730] hover:text-[var(--sleeve)]'
          }`}
          title="Toggle vinyl crackle & surface noise"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        <button
          onClick={prevTrack}
          className="p-2.5 rounded-full text-[var(--sleeve)] bg-[#0E1216] border border-[#202730] hover:border-[var(--brass)] hover:text-[var(--brass)] transition-all transform active:scale-95"
          title="Previous Track / Swap Disc Right (Left Arrow)"
        >
          <SkipBack className="w-5 h-5 fill-current" />
        </button>

        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-[var(--brass)] text-[#050608] flex items-center justify-center shadow-[0_6px_20px_rgba(200,162,90,0.4)] hover:scale-105 active:scale-95 transition-all focus:outline-none"
          title={isPlaying ? 'Pause (Space)' : 'Lower Needle & Play (Space)'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 ml-0.5 fill-current" />
          )}
        </button>

        <button
          onClick={nextTrack}
          className="p-2.5 rounded-full text-[var(--sleeve)] bg-[#0E1216] border border-[#202730] hover:border-[var(--brass)] hover:text-[var(--brass)] transition-all transform active:scale-95"
          title="Next Track / Swap Disc Left (Right Arrow)"
        >
          <SkipForward className="w-5 h-5 fill-current" />
        </button>

        {/* Volume controls */}
        <div className="flex items-center gap-2 text-[var(--text-muted)] bg-[#0E1216] border border-[#202730] px-3 py-1.5 rounded-full">
          <button
            onClick={toggleMute}
            className="hover:text-[var(--sleeve)] transition-colors"
            title="Mute / Unmute"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 sm:w-20 h-1 rounded-full cursor-pointer accent-[var(--brass)]"
            title="Plinth Amplifier Volume"
          />
        </div>
      </div>
    </div>
  );
};
