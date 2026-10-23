# Spindle — Vinyl-Style Music Player (Web Edition)

> A warm, analog-inspired listening room where the entire interface is a turntable record player.

Spindle brings the tactile ritual of vinyl back to modern streaming: pull a sleeve from the crate, slide the vinyl out, drop the needle, and listen to music with smooth 33⅓ RPM inertia and dynamic album color accents.

---

## Features

- **The Crate Archive**:
  - Grid of authentic vinyl sleeves with paper spine edges, textures, and track counts.
  - Vinyl disc peeking out of each sleeve that slides up smoothly on hover or touch.
  - Filter by **All**, **Albums**, and **Playlists**, plus real-time client-side search.
  - Tapping any record slides the disc onto the platter and drops the needle.

- **The Direct-Drive Turntable**:
  - Deep black vinyl (`#0D0E11`) with CSS concentric microgrooves and physical specular light sheen.
  - Realistic 33⅓ RPM spinning physics with spin-up ramp and spin-down inertia.
  - Dynamic center label showing album artwork with spindle pin.
  - **Tonearm tracking**: Brass pivot gimbal, curved tonearm rod, headshell, and diamond stylus needle. Angle smoothly maps from 18° at track start to 34° at runout groove.
  - **Interactive Tonearm Scrubbing**: Drag or grab the tonearm to seek through the record.
  - **Disc-Swapping Animation**: Tonearm lifts, current disc slides off, and new disc slides in from the opposite side.
  - Platter swipe gestures (swipe left/right to swap records).

- **Mini Spinning Vinyl in Track List**:
  - Every track has a mini 28px vinyl icon tinted with the album's dominant color.
  - Active track's mini disc spins continuously in sync with the platter!
  - Clicking any track plays it directly with disc-swap animation.

- **Synthesized Vinyl Surface Noise & Crackle**:
  - Built-in procedural Web Audio vinyl noise engine: gentle groove hiss, random dust clicks, and 35 Hz motor rumble.
  - Dedicated toggle and volume slider.

- **Audio & Streaming Architecture**:
  - Working audio engine with curated vinyl jazz, lo-fi, and soul sessions ready out-of-the-box.
  - **Spotify PKCE Architecture** (Section 4a): authorization code with PKCE, subscription gating (`product === 'premium'`), and playlist import.
  - Keyboard shortcuts: `Space` (Play/Pause), `Arrow Right` (Next record), `Arrow Left` (Previous record).
  - Responsive design from 375px mobile screens to wide desktop monitors.

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Spotify Setup (Optional for Live Spotify Playback)

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Create an App and add the redirect URI:
   ```
   http://127.0.0.1:5173/
   ```
3. Copy your **Client ID**.
4. Create a `.env` file in the project root:
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_client_id_here
   VITE_SPOTIFY_REDIRECT_URI=http://127.0.0.1:5173/
   ```
5. Click **Connect Music** in the top-right corner to authenticate with your Spotify Premium account.
