import { Collection } from '../types';
import { ALBUM_COVERS } from '../utils/albumArtworks';

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    title: 'Kind of Blue Sessions',
    artist: 'Miles Davis & John Coltrane',
    type: 'album',
    year: 1959,
    coverUrl: ALBUM_COVERS.kindOfBlue,
    dominantColor: '#3A6890',
    trackCount: 5,
    description: 'Columbia Records mono master. Iconic modal jazz recorded at the 30th Street Studio, New York.',
    tracks: [
      {
        id: 'track-1-1',
        title: 'So What (Modal Studio Take)',
        artist: 'Miles Davis',
        album: 'Kind of Blue Sessions',
        durationMs: 204000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      },
      {
        id: 'track-1-2',
        title: 'Freddie Freeloader (Platter Mix)',
        artist: 'Miles Davis, Wynton Kelly',
        album: 'Kind of Blue Sessions',
        durationMs: 232000,
        trackNumber: 2,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      },
      {
        id: 'track-1-3',
        title: 'Blue in Green (Night Echoes)',
        artist: 'Miles Davis, Bill Evans',
        album: 'Kind of Blue Sessions',
        durationMs: 198000,
        trackNumber: 3,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      },
      {
        id: 'track-1-4',
        title: 'All Blues (6/8 Rhythmic Cut)',
        artist: 'Miles Davis',
        album: 'Kind of Blue Sessions',
        durationMs: 260000,
        trackNumber: 4,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      },
      {
        id: 'track-1-5',
        title: 'Flamenco Sketches (Alternate Groove)',
        artist: 'Miles Davis, Cannonball Adderley',
        album: 'Kind of Blue Sessions',
        durationMs: 215000,
        trackNumber: 5,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      }
    ]
  },
  {
    id: 'col-2',
    title: 'Midnight Tokyo Lo-Fi',
    artist: 'Haruka & The Tape Collective',
    type: 'playlist',
    year: 2024,
    coverUrl: ALBUM_COVERS.tokyoLofi,
    dominantColor: '#C84858',
    trackCount: 4,
    description: 'Analog 4-track cassette recordings pressed onto heavyweight 180g virgin vinyl in Shibuya.',
    tracks: [
      {
        id: 'track-2-1',
        title: 'Shibuya Rain (SP-404 Rhodes)',
        artist: 'Haruka',
        album: 'Midnight Tokyo Lo-Fi',
        durationMs: 175000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      },
      {
        id: 'track-2-2',
        title: 'Akihabara Neon Drift',
        artist: 'Tape Collective',
        album: 'Midnight Tokyo Lo-Fi',
        durationMs: 192000,
        trackNumber: 2,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      },
      {
        id: 'track-2-3',
        title: 'Late Train to Shinjuku',
        artist: 'Haruka, Kenji',
        album: 'Midnight Tokyo Lo-Fi',
        durationMs: 210000,
        trackNumber: 3,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      },
      {
        id: 'track-2-4',
        title: 'Rooftop Dawn & Warm Tea',
        artist: 'The Tape Collective',
        album: 'Midnight Tokyo Lo-Fi',
        durationMs: 168000,
        trackNumber: 4,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      }
    ]
  },
  {
    id: 'col-3',
    title: 'Motown Soul & Dusty Brass',
    artist: 'Detroit Rhythm Section',
    type: 'album',
    year: 1968,
    coverUrl: ALBUM_COVERS.motownSoul,
    dominantColor: '#E28738',
    trackCount: 4,
    description: 'Warm tape saturation, upright bass lines, and crackling horn section stabs.',
    tracks: [
      {
        id: 'track-3-1',
        title: 'Grand River Ave Shuffle',
        artist: 'Detroit Rhythm Section',
        album: 'Motown Soul & Dusty Brass',
        durationMs: 195000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      },
      {
        id: 'track-3-2',
        title: 'Sweet Cadillac Cruisin’',
        artist: 'Detroit Rhythm Section',
        album: 'Motown Soul & Dusty Brass',
        durationMs: 182000,
        trackNumber: 2,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      },
      {
        id: 'track-3-3',
        title: 'Horns Over Belle Isle',
        artist: 'Detroit Horn Ensemble',
        album: 'Motown Soul & Dusty Brass',
        durationMs: 220000,
        trackNumber: 3,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      },
      {
        id: 'track-3-4',
        title: 'Last Call at the Flame Show Bar',
        artist: 'Detroit Rhythm Section',
        album: 'Motown Soul & Dusty Brass',
        durationMs: 178000,
        trackNumber: 4,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      }
    ]
  },
  {
    id: 'col-4',
    title: 'Vintage Bossa Nova 1964',
    artist: 'Astrud & Rio Trio',
    type: 'album',
    year: 1964,
    coverUrl: ALBUM_COVERS.bossaNova,
    dominantColor: '#2D5A46',
    trackCount: 4,
    description: 'Nylon acoustic guitar, brushed snare patterns, and soft Portuguese whispers.',
    tracks: [
      {
        id: 'track-4-1',
        title: 'Ipanema Breeze (Takes 1 & 2)',
        artist: 'Astrud & Rio Trio',
        album: 'Vintage Bossa Nova 1964',
        durationMs: 189000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      },
      {
        id: 'track-4-2',
        title: 'Corcovado Sunset Acoustic',
        artist: 'Rio Trio',
        album: 'Vintage Bossa Nova 1964',
        durationMs: 205000,
        trackNumber: 2,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      },
      {
        id: 'track-4-3',
        title: 'Desafinado Warm Reverie',
        artist: 'Astrud & Rio Trio',
        album: 'Vintage Bossa Nova 1964',
        durationMs: 175000,
        trackNumber: 3,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      },
      {
        id: 'track-4-4',
        title: 'Wave (Acoustic Platter)',
        artist: 'Rio Trio',
        album: 'Vintage Bossa Nova 1964',
        durationMs: 210000,
        trackNumber: 4,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      }
    ]
  },
  {
    id: 'col-5',
    title: 'Blue Note Echoes',
    artist: 'The 33⅓ Hard Bop Quintet',
    type: 'album',
    year: 1961,
    coverUrl: ALBUM_COVERS.blueNote,
    dominantColor: '#1C385C',
    trackCount: 4,
    description: 'Reid Miles inspired typography, Francis Wolff photography, deep room reverb.',
    tracks: [
      {
        id: 'track-5-1',
        title: 'Van Gelder Studio Reverie',
        artist: 'The 33⅓ Hard Bop Quintet',
        album: 'Blue Note Echoes',
        durationMs: 224000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      },
      {
        id: 'track-5-2',
        title: 'Hackensack Blue Walk',
        artist: 'The 33⅓ Hard Bop Quintet',
        album: 'Blue Note Echoes',
        durationMs: 190000,
        trackNumber: 2,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      },
      {
        id: 'track-5-3',
        title: 'Autumn in Englewood Cliffs',
        artist: 'The 33⅓ Hard Bop Quintet',
        album: 'Blue Note Echoes',
        durationMs: 245000,
        trackNumber: 3,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      },
      {
        id: 'track-5-4',
        title: 'Midnight Cantaloupe',
        artist: 'The 33⅓ Hard Bop Quintet',
        album: 'Blue Note Echoes',
        durationMs: 201000,
        trackNumber: 4,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      }
    ]
  },
  {
    id: 'col-6',
    title: 'Golden Era Hip-Hop Breaks',
    artist: 'Crate Diggers Anonymous',
    type: 'playlist',
    year: 1994,
    coverUrl: ALBUM_COVERS.goldenHipHop,
    dominantColor: '#C45A33',
    trackCount: 4,
    description: 'Strictly vinyl samples: punchy acoustic drum breaks, chopped soul vocals, MPC3000 swing.',
    tracks: [
      {
        id: 'track-6-1',
        title: 'The Amen Chop & Filter',
        artist: 'Crate Diggers Anonymous',
        album: 'Golden Era Hip-Hop Breaks',
        durationMs: 165000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      },
      {
        id: 'track-6-2',
        title: 'Queensbridge Dusty Snare',
        artist: 'Crate Diggers Anonymous',
        album: 'Golden Era Hip-Hop Breaks',
        durationMs: 180000,
        trackNumber: 2,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      },
      {
        id: 'track-6-3',
        title: 'Subway Graffiti Boom Bap',
        artist: 'Crate Diggers Anonymous',
        album: 'Golden Era Hip-Hop Breaks',
        durationMs: 195000,
        trackNumber: 3,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      },
      {
        id: 'track-6-4',
        title: 'Bronx Rooftop Sunset Jam',
        artist: 'Crate Diggers Anonymous',
        album: 'Golden Era Hip-Hop Breaks',
        durationMs: 172000,
        trackNumber: 4,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      }
    ]
  }
];
