# Spindle: vinyl-style music player (web first, app later)

Working name: **Spindle** (change it whenever). This is an original app inspired by the idea of a vinyl player UI. Don't copy any other app's name, assets, or branding.

## 0. Instructions for the agent (read first)

- Use the **taste skill** (and any frontend-design skill you have) for every UI decision. If it isn't available, follow Section 6 as the design brief.
- **Check the current official docs before writing any auth or playback code.** Spotify and Apple Music change their rules often. Don't trust memory. Docs to check: Spotify Web API + Web Playback SDK, Apple MusicKit JS v3.
- Build in the phases in Section 8. Finish and verify one phase before the next.
- Ask me before adding paid services or anything that needs a credit card.

## 1. What this is

A music player where the whole interface is a record player.

1. Sign in with **Spotify** or **Apple Music**.
2. App imports my playlists (and saved albums).
3. I see my playlists/albums as **vinyl sleeves** using the cover art.
4. I open one, a disc slides out and lands on a turntable.
5. Music plays through my own Spotify/Apple Music subscription. No subscription means no playback.
6. Next/previous = discs swap on the platter with smooth animation.
7. The track list shows a **small vinyl icon** next to every song name.

We are **not** hosting, downloading, or storing any audio. The official SDKs stream it.

## 2. Platforms and phases

- **Phase 1: website** (what I test with). Desktop browser first, but must work on a phone browser layout too.
- **Phase 2: installable PWA** (cheap way to get "an app").
- **Phase 3 (later): real mobile app.** Heads-up: Spotify's Web Playback SDK does not work inside native mobile webviews. A real app needs Spotify's mobile SDK (user must have the Spotify app installed) and Apple's native MusicKit. Don't start this until phases 1-2 are solid.

## 3. Tech stack

- Vite + React + TypeScript
- **Motion** (the Framer Motion successor) for animation, using `layoutId` shared-element transitions for sleeve to player
- Zustand for state
- Plain CSS (CSS variables for the design tokens in Section 6). No heavy UI kit.
- A tiny Node/Express server (or serverless function) **only** for Apple Music's developer token. Spotify needs no backend (PKCE flow).
- Cover color extraction: `colorthief` or `node-vibrant` to pull a dominant color from album art for the disc label and accents.

## 4. Music provider architecture

Build a provider interface so the UI never knows which service is active:

```ts
interface MusicProvider {
  id: 'spotify' | 'apple';
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  isSubscriber(): Promise<boolean>;          // gate playback on this
  getPlaylists(): Promise<Collection[]>;     // paginated
  getAlbums(): Promise<Collection[]>;        // saved/library albums
  getTracks(collectionId: string): Promise<Track[]>;
  play(collectionId: string, trackIndex: number): Promise<void>;
  pause(): void; resume(): void;
  next(): void;  previous(): void;
  seek(ms: number): void;
  setVolume(v: number): void;
  onState(cb: (s: PlayerState) => void): () => void; // position, track, playing
}
```

Build **SpotifyProvider fully first**. AppleProvider comes after, same interface.

### 4a. Spotify

- Auth: **Authorization Code flow with PKCE** (no client secret in the browser, ever).
- Scopes (verify against docs): `streaming`, `user-read-email`, `user-read-private`, `playlist-read-private`, `playlist-read-collaborative`, `user-library-read`, `user-read-playback-state`, `user-modify-playback-state`.
- Playback: **Web Playback SDK** (creates a browser "device"), then transfer playback to it.
- Premium check: read the user's `product` field from the profile. If not `premium`, show a friendly full-screen message ("Spindle plays music through Spotify Premium. You can still browse your library.") and disable play.
- Redirect URI rules are strict (HTTPS, or loopback IP `127.0.0.1` for local dev; `localhost` may be rejected). Check the docs.
- New Spotify apps start in **Development Mode** with a small allowlist of users and some restrictions. Verify the current limits. I need to add my own account in the Spotify Developer Dashboard.
- Handle token refresh silently. Handle 401/403/429 with clear messages and retry with backoff.

### 4b. Apple Music

- **MusicKit JS v3** in the browser.
- Needs an **Apple Developer Program membership** (paid, yearly) to create a MusicKit key. Flag this to me before building it.
- The server signs a short-lived **developer token (JWT, ES256)** with the private key. The key must **never** reach the frontend or the repo.
- User signs in via MusicKit, which gives a Music User Token.
- Check for an active subscription. If none, same friendly message as Spotify.
- Library playlists + library albums come from the MusicKit API.

### 4c. Shared rules

- Respect each service's branding and attribution guidelines (show the service logo and link back where required). Don't allow downloads, don't cache audio.
- Never store tokens in code. Use env vars and `.env.example`.

## 5. Screens and behavior

### 5.1 Sign-in
- Two big buttons: **Continue with Spotify** and **Continue with Apple Music**.
- Short line explaining it needs an active subscription to play music.
- Background: slowly turning record, very subtle.

### 5.2 Library ("the crate")
- Tabs: **Playlists** | **Albums**.
- Grid of **sleeves** (square cover art with a slight paper texture and a visible edge/spine).
- A disc is partially visible peeking out of the top of each sleeve.
- Hover (desktop) / press (mobile): disc slides up a little further.
- Lazy-load covers, skeleton placeholders while loading, infinite scroll for big libraries.
- Playlists without cover art: generate a cover from a 2x2 mosaic of its first tracks' art.
- Search box that filters the crate (client-side).

### 5.3 Open a playlist/album (the key transition)
1. Tap a sleeve. It lifts and moves to the player area (shared-element transition, same cover keeps its identity).
2. The disc slides out of the sleeve and drops onto the platter.
3. The tonearm lifts and swings over, then lowers onto the record.
4. Playback starts.

Closing reverses it. Back button / swipe-down returns to the crate.

### 5.4 Player (turntable)

```
+--------------------------------------------------+
|  <  Playlist name                          (...) |
|                                                  |
|        ______________                  tonearm   |
|      /   .--------.   \                  \       |
|     |   /  label   \   |  <- platter      \__o   |
|     |   \  (cover) /   |                         |
|      \   '--------'   /                          |
|        --------------                           |
|                                                  |
|   Song title                                     |
|   Artist - Album                                 |
|   0:42 ----o------------------------ 3:51        |
|   [shuffle] [prev] [PLAY/PAUSE] [next] [repeat]  |
|                       volume ----o--             |
+--------------------------------------------------+
|  Track list (scrolls)                            |
|  (o) 1  Song name              Artist     3:51   |
|  (o) 2  Song name              Artist     2:47   |
+--------------------------------------------------+
```

- **Disc**: black vinyl made with CSS (`repeating-radial-gradient` for grooves + a `conic-gradient` shine). Center label = circular crop of the current track's album art with a small spindle hole.
- **Spin**: 33⅓ rpm = one turn per ~1.8s. On play it **spins up** with easing, on pause it **spins down** gradually (don't stop instantly). Animate with `transform: rotate` only.
- **Tonearm**: rotates onto the record when playing, lifts when paused. Its angle maps to track progress (about 18° at start to 34° at end). **Dragging the tonearm scrubs** the song (nice-to-have).
- **Next / Previous**: the tonearm lifts, the current disc slides off (next goes left, previous goes right) while the new disc slides in from the opposite side and settles on the platter, then the arm lowers. Also support **swipe left/right** on the platter and keyboard arrows.
- Show a small stack of "up next" discs peeking at the edge of the platter.
- **Mini disc in the track list**: every row has a small vinyl icon (~28px) tinted with the album's dominant color. The currently playing row's icon **spins**; others are still. Clicking a row plays it with the same disc-swap animation.
- Controls: play/pause, next, previous, seek bar, shuffle, repeat, volume. Media keys + spacebar support.
- Optional: soft vinyl crackle sound effect toggle (off by default, our own generated/royalty-free sample, not from the streaming services).

### 5.5 Edge cases
- No internet, expired token, provider error, premium required, track unavailable in region: each gets a clear message that says what happened and what to do. No generic "Something went wrong".
- Empty library: "No playlists yet. Make one in Spotify and it will show up here."
- Local files / podcasts / unplayable items: skip them and don't crash.

## 6. Design brief (taste)

Concept: **a listening room**, not a music app with a vinyl skin. Warm lamp-lit room, heavy turntable, records you can feel.

**Palette** (named, use as CSS variables)
- `--plinth` `#1C2228` deep blue-graphite, main background
- `--felt` `#2E4A40` slipmat green, secondary surfaces
- `--lacquer` `#0D0E11` the vinyl itself
- `--brass` `#C8A25A` tonearm, small highlights, focus rings
- `--sleeve` `#E6E0D2` paper, used only on sleeve edges and text on dark
- `--accent` dynamic: dominant color pulled from the current album art. Updates with a smooth color transition.

Don't fall back on a generic cream + terracotta look, or black + neon green. The dynamic album-color accent is the point.

**Type**: one display/UI family with character (e.g. Bricolage Grotesque) plus a quiet body face (e.g. Instrument Sans). Sentence case. No ALL-CAPS eyebrow labels, no number markers unless the content really is a sequence (track numbers are fine).

**Principles**
- One memorable thing: the turntable. Keep everything else calm and quiet.
- Real-feeling physics: ease-out when things land, slight overshoot on the tonearm, inertia on the spin-down.
- Copy is short and plain. Buttons say what they do ("Play", "Open playlist").
- Don't scatter decorative motion. Motion should answer something I did (tap, swipe, change song).

## 7. Motion rules (smooth transitions everywhere)

- Animate **only `transform` and `opacity`** (60fps). No animating width/height/top/left.
- Use `layoutId` shared-element transitions for: sleeve to player, cover to platter label, track row to player.
- Page/tab changes: short crossfade + small slide (200-350ms, ease-out).
- Accent color change on track change: ~600ms transition.
- Press feedback on all buttons (tiny scale).
- Respect `prefers-reduced-motion`: replace big moves with fades, stop continuous spinning (show a static disc with a slow progress ring instead).
- Pause continuous animations when the tab is hidden.

## 8. Build phases (stop and let me test after each)

1. **Skeleton + design system**: project setup, tokens, fonts, routing (sign-in, library, player), mock data so I can see the UI before connecting anything. Includes the full turntable animation working with fake tracks.
2. **Spotify login + library**: PKCE auth, import playlists/albums, sleeves with real covers.
3. **Spotify playback**: Web Playback SDK, play/pause/next/prev/seek/volume wired to the turntable, Premium gating.
4. **Polish**: all transitions in Section 7, color extraction, keyboard/swipe controls, error states, mobile layout.
5. **Apple Music provider** (after I confirm I have the developer membership).
6. **PWA** (manifest, icons, installable).
7. Later: native app plan.

## 9. Setup I need to do (tell me exactly when)

- Spotify: create an app in the Spotify Developer Dashboard, add my redirect URI, copy the Client ID into `.env`, add my account to the allowlist.
- Apple: Apple Developer account, MusicKit key, Team ID, Key ID, private key file (kept out of git).
- Provide `.env.example` with every variable and a README with run steps.

## 10. Definition of done (Phase 1-4)

- I can sign in with Spotify, see my real playlists as sleeves, open one, and hear music with Premium.
- Disc spins up/down smoothly, tonearm tracks progress, next/prev swap discs with animation.
- Track list shows a mini vinyl by every song, the current one spinning.
- Non-Premium account sees the friendly message and can't play.
- Works at 375px wide and on desktop. No console errors. Tokens never in the repo.
