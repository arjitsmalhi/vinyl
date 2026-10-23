import React from 'react';
import { usePlayerStore } from '../store/playerStore';
import { Track } from '../types';

function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export const TrackList: React.FC = () => {
  const {
    currentCollection,
    currentTrackIndex,
    isPlaying,
    playTrack
  } = usePlayerStore();

  if (!currentCollection || !currentCollection.tracks) {
    return null;
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 mt-2">
      <div className="border-t border-[var(--border-subtle)] pt-4 pb-12">
        <div className="flex items-center justify-between text-xs text-[var(--text-faint)] font-medium uppercase tracking-wider mb-3 px-3">
          <span>Track</span>
          <span>Time</span>
        </div>

        <div className="space-y-1.5">
          {currentCollection.tracks.map((track: Track, idx: number) => {
            const isSelected = currentTrackIndex === idx;

            return (
              <div
                key={track.id || idx}
                onClick={() => playTrack(idx)}
                className={`group flex items-center justify-between p-2.5 sm:px-3 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[var(--bg-surface-elevated)] border border-[var(--brass)] shadow-md'
                    : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
                  {/* Mini Vinyl Disc */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`mini-vinyl ${isSelected && isPlaying ? 'spinning' : ''}`}
                      style={{
                        boxShadow: isSelected ? '0 0 10px rgba(200,162,90,0.4)' : undefined
                      }}
                    >
                      {/* Mini Center Label */}
                      <div
                        className="mini-vinyl-label"
                        style={{
                          backgroundColor: isSelected ? 'var(--brass)' : currentCollection.dominantColor
                        }}
                      />
                    </div>
                  </div>

                  {/* Track number & metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-[var(--text-faint)] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h4
                        className={`text-xs sm:text-sm font-medium tracking-tight truncate ${
                          isSelected
                            ? 'text-[var(--brass)] font-semibold'
                            : 'text-[var(--sleeve)] group-hover:text-[var(--brass)]'
                        } transition-colors`}
                      >
                        {track.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] truncate pl-6">
                      {track.artist}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="font-mono text-xs text-[var(--text-faint)] group-hover:text-[var(--text-muted)] tabular-nums shrink-0">
                  {formatDuration(track.durationMs)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
