import React, { useRef, useState } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Eye } from 'lucide-react';

export const Turntable: React.FC = () => {
  const {
    currentCollection,
    currentTrackIndex,
    isPlaying,
    isTonearmDown,
    tonearmAngle,
    isDiscSwapping,
    discSwapDirection,
    setTonearmDragging,
    setTonearmAngle,
    nextTrack,
    prevTrack,
    togglePlay
  } = usePlayerStore();

  const [is3DMode, setIs3DMode] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const platterRef = useRef<HTMLDivElement>(null);

  // Platter swipe gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextTrack(); // Swiped left -> next
      } else {
        prevTrack(); // Swiped right -> prev
      }
    }
    setTouchStartX(null);
  };

  // Dragging tonearm interaction
  const handleTonearmPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setTonearmDragging(true);

    const onPointerMove = (ev: PointerEvent) => {
      if (!platterRef.current) return;
      const rect = platterRef.current.getBoundingClientRect();
      const pivotX = rect.right - 20;
      const pivotY = rect.top + 30;

      const deltaX = ev.clientX - pivotX;
      const deltaY = ev.clientY - pivotY;

      const angleRad = Math.atan2(deltaY, -deltaX);
      const angleDeg = (angleRad * 180) / Math.PI;

      const normalizedAngle = Math.max(18, Math.min(34, 90 - angleDeg));
      setTonearmAngle(normalizedAngle);
    };

    const onPointerUp = () => {
      setTonearmDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Perspective Stage */}
      <div className="turntable-stage-3d">
        <div
          ref={platterRef}
          className={`turntable-plinth-3d ${is3DMode ? 'turntable-view-3d' : 'turntable-view-flat'}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 4 Isolation Damping Feet */}
          <div className="turntable-foot turntable-foot-tl" />
          <div className="turntable-foot turntable-foot-tr" />
          <div className="turntable-foot turntable-foot-bl" />
          <div className="turntable-foot turntable-foot-br" />

          {/* Top Brass 33 RPM Speed Control & View Toggle */}
          <div className="absolute top-5 left-5 flex items-center gap-3 z-30">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#080A0D] border border-[var(--brass)] flex items-center justify-center shadow-md">
                <span className="font-display text-[10px] font-bold text-[var(--brass)]">
                  33
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-[var(--text-faint)] mt-1 font-mono">
                RPM
              </span>
            </div>

            {/* Strobe speed indicator lamp */}
            <div className="w-3.5 h-6 rounded bg-[#06080A] border border-[#232B34] flex flex-col justify-around py-0.5 px-0.5">
              <div className={`w-full h-1 rounded-full ${isPlaying ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950'}`} />
              <div className={`w-full h-1 rounded-full ${isPlaying ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-red-950'}`} />
            </div>

            {/* 3D / Flat View Toggle Button */}
            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className="ml-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0C1014] hover:bg-[#161D24] border border-[#232B34] text-[10px] text-[var(--sleeve)] font-medium shadow-md transition-all hover:border-[var(--brass)]"
              title="Toggle 3D Perspective Turntable View"
            >
              <Box className="w-3.5 h-3.5 text-[var(--brass)]" />
              <span>{is3DMode ? '3D View' : 'Flat View'}</span>
            </button>
          </div>

          {/* Up-next vinyl sleeve stack peeking on the left */}
          <div
            onClick={prevTrack}
            className="absolute left-1 top-1/2 -translate-y-1/2 -translate-x-2 hidden sm:block cursor-pointer opacity-50 hover:opacity-100 transition-opacity z-10"
            title="Previous record (or swipe right)"
          >
            <div className="w-12 h-36 rounded-l-md bg-[#050608] border-l border-y border-[#232B34] shadow-2xl flex items-center justify-center">
              <div className="w-1.5 h-24 rounded-full bg-[var(--felt)]" />
            </div>
          </div>

          {/* Up-next vinyl disc stack peeking on the right */}
          <div
            onClick={nextTrack}
            className="absolute right-1 top-1/2 -translate-y-1/2 translate-x-2 hidden sm:block cursor-pointer opacity-50 hover:opacity-100 transition-opacity z-10"
            title="Next record (or swipe left)"
          >
            <div className="w-12 h-36 rounded-r-md bg-[#050608] border-r border-y border-[#232B34] shadow-2xl flex items-center justify-center">
              <div className="w-1.5 h-24 rounded-full bg-[var(--brass)]" />
            </div>
          </div>

          {/* 3D Turntable Platter & Felt Slipmat */}
          <div className="turntable-platter-3d relative">
            {/* Animated Vinyl Disc Swapping with Framer Motion */}
            <AnimatePresence mode="wait">
              {!isDiscSwapping && currentCollection && (
                <motion.div
                  key={`${currentCollection.id}-${currentTrackIndex}`}
                  initial={{
                    x: discSwapDirection === 'next' ? 260 : -260,
                    opacity: 0,
                    scale: 0.94
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', damping: 22, stiffness: 200 }
                  }}
                  exit={{
                    x: discSwapDirection === 'next' ? -280 : 280,
                    opacity: 0,
                    scale: 0.94,
                    transition: { duration: 0.35, ease: 'easeIn' }
                  }}
                  onClick={togglePlay}
                  className={`vinyl-disc ${isPlaying ? 'spinning' : 'spinning-paused'}`}
                >
                  {/* Dynamic Center Label */}
                  <div className="vinyl-label">
                    <img
                      src={currentCollection.coverUrl}
                      alt={currentCollection.title}
                      draggable={false}
                    />
                    {/* Spindle hole */}
                    <div className="vinyl-spindle-hole" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center Platter Brass Spindle Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-b from-[#FFF2D0] via-[#C8A25A] to-[#453310] shadow-[0_3px_6px_rgba(0,0,0,0.95)] border border-[#2B200A] z-40 pointer-events-none" />
          </div>

          {/* 3D Tonearm Assembly */}
          <div className="tonearm-assembly-3d">
            {/* Counterweight */}
            <div className="tonearm-counterweight" />

            {/* Pivot Gimbal Base */}
            <div
              className="tonearm-base"
              onPointerDown={handleTonearmPointerDown}
              title="Drag tonearm to scrub track"
            />

            {/* Tonearm Rod & Headshell */}
            <div
              className="tonearm-rod"
              style={{
                transform: `rotate(${tonearmAngle}deg)`,
                filter: isTonearmDown ? 'drop-shadow(-3px 5px 8px rgba(0,0,0,0.8))' : 'drop-shadow(-10px 18px 20px rgba(0,0,0,0.9))'
              }}
              onPointerDown={handleTonearmPointerDown}
            >
              {/* Headshell & Stylus Needle */}
              <div className="tonearm-headshell">
                <div className="tonearm-stylus" />
              </div>
            </div>
          </div>

          {/* Plinth Brand Plate at bottom */}
          <div className="absolute bottom-4 right-8 flex items-center gap-2 pointer-events-none opacity-80 z-20">
            <span className="font-display text-[10px] tracking-widest uppercase text-[var(--brass)] font-semibold">
              SPINDLE DIRECT-DRIVE
            </span>
            <span className="text-[9px] font-mono text-[var(--text-faint)]">3D HI-FI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
