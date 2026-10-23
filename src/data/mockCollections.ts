import { Collection } from '../types';
import { ALBUM_COVERS } from '../utils/albumArtworks';

export const MOCK_COLLECTIONS: Collection[] = [
  // Reference Image 1: Law of Attraction
  {
    id: 'col-ref-1',
    title: 'Law of Attraction',
    artist: 'She Her Hers',
    type: 'album',
    year: 2022,
    coverUrl: ALBUM_COVERS.lawOfAttraction,
    dominantColor: '#28B8A5',
    spineColor: '#1A7A6E',
    trackCount: 5,
    description: 'Dream pop & indie shimmer recorded with crystalline guitars and warm analog synthesizer pads.',
    tracks: [
      {
        id: 'track-ref-1-1',
        title: 'Law of Attraction',
        artist: 'She Her Hers',
        album: 'Law of Attraction',
        durationMs: 215000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      },
      {
        id: 'track-ref-1-2',
        title: 'Clear Water Pool',
        artist: 'She Her Hers',
        album: 'Law of Attraction',
        durationMs: 198000,
        trackNumber: 2,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      },
      {
        id: 'track-ref-1-3',
        title: 'Sunlight Drift',
        artist: 'She Her Hers',
        album: 'Law of Attraction',
        durationMs: 234000,
        trackNumber: 3,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      }
    ]
  },

  // Reference Image 2: Chulo pt.2
  {
    id: 'col-ref-2',
    title: 'Chulo pt.2',
    artist: 'Bad Gyal, Tokischa, Young Miko',
    type: 'album',
    year: 2023,
    coverUrl: ALBUM_COVERS.chuloPt2,
    dominantColor: '#E11D48',
    spineColor: '#9F1239',
    trackCount: 4,
    description: 'Hypnotic reggaeton rhythm, deep sub-bass, and sultry Latin trap hooks on vinyl cut.',
    tracks: [
      {
        id: 'track-ref-2-1',
        title: 'Chulo pt.2',
        artist: 'Bad Gyal, Tokischa, Young Miko',
        album: 'Chulo pt.2',
        durationMs: 220000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      },
      {
        id: 'track-ref-2-2',
        title: 'Fiebre Nocturna',
        artist: 'Bad Gyal',
        album: 'Chulo pt.2',
        durationMs: 185000,
        trackNumber: 2,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      }
    ]
  },

  // Reference Image 3: See You Again
  {
    id: 'col-ref-3',
    title: 'See You Again',
    artist: 'Tyler, The Creator feat. Kali Uchis',
    type: 'album',
    year: 2017,
    coverUrl: ALBUM_COVERS.seeYouAgain,
    dominantColor: '#F59E0B',
    spineColor: '#D97706',
    trackCount: 4,
    description: 'Lush orchestral brass, whimsical strings, and honey-glazed hip-hop groove.',
    tracks: [
      {
        id: 'track-ref-3-1',
        title: 'See You Again (feat. Kali Uchis)',
        artist: 'Tyler, The Creator',
        album: 'See You Again',
        durationMs: 180000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      },
      {
        id: 'track-ref-3-2',
        title: 'Glitter Glow',
        artist: 'Tyler, The Creator',
        album: 'See You Again',
        durationMs: 205000,
        trackNumber: 2,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      }
    ]
  },

  // Reference Image 3: Projector Monster Blues
  {
    id: 'col-ref-4',
    title: 'Projector Monster Blues',
    artist: 'Loft Light Club',
    type: 'album',
    year: 2021,
    coverUrl: ALBUM_COVERS.projectorBlues,
    dominantColor: '#EC4899',
    spineColor: '#DB2777',
    trackCount: 4,
    description: 'Bedroom pop and nostalgic VHS aesthetics with warm vintage spring reverb.',
    tracks: [
      {
        id: 'track-ref-4-1',
        title: 'Projector Monster Blues',
        artist: 'Loft Light Club',
        album: 'Projector Monster Blues',
        durationMs: 195000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      }
    ]
  },

  // Reference Image 3: Peel Slowly
  {
    id: 'col-ref-5',
    title: 'Peel Slowly',
    artist: 'Crush & Pulp',
    type: 'album',
    year: 2020,
    coverUrl: ALBUM_COVERS.peelSlowly,
    dominantColor: '#EAB308',
    spineColor: '#CA8A04',
    trackCount: 4,
    description: 'Sunny indie pop with bright acoustic strumming and infectious citrus horns.',
    tracks: [
      {
        id: 'track-ref-5-1',
        title: 'Peel Slowly',
        artist: 'Crush & Pulp',
        album: 'Peel Slowly',
        durationMs: 172000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      }
    ]
  },

  // Reference Image 3: Channel After Midnight
  {
    id: 'col-ref-6',
    title: 'Channel After Midnight',
    artist: 'Static Season',
    type: 'album',
    year: 2019,
    coverUrl: ALBUM_COVERS.channelAfterMidnight,
    dominantColor: '#C2410C',
    spineColor: '#9A3412',
    trackCount: 4,
    description: 'Late night warm broadcast frequencies and analog tape saturation beats.',
    tracks: [
      {
        id: 'track-ref-6-1',
        title: 'Channel After Midnight',
        artist: 'Static Season',
        album: 'Channel After Midnight',
        durationMs: 210000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/648/648588_11861866-lq.mp3'
      }
    ]
  },

  // Reference Image 3: Signal Ghost
  {
    id: 'col-ref-7',
    title: 'Signal Ghost',
    artist: 'Floor Eleven',
    type: 'album',
    year: 2023,
    coverUrl: ALBUM_COVERS.signalGhost,
    dominantColor: '#10B981',
    spineColor: '#059669',
    trackCount: 3,
    description: 'Architectural minimalism, deep sub-bass pulses, and echoing synthesizer leads.',
    tracks: [
      {
        id: 'track-ref-7-1',
        title: 'Signal Ghost',
        artist: 'Floor Eleven',
        album: 'Signal Ghost',
        durationMs: 228000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/557/557815_11861866-lq.mp3'
      }
    ]
  },

  // Reference Image 3: Head Down Season
  {
    id: 'col-ref-8',
    title: 'Head Down Season',
    artist: 'Benji & the Silhouettes',
    type: 'album',
    year: 2018,
    coverUrl: ALBUM_COVERS.headDownSeason,
    dominantColor: '#71717A',
    spineColor: '#52525B',
    trackCount: 4,
    description: 'Soulful acoustic songwriting and intimate close-mic vocal performances.',
    tracks: [
      {
        id: 'track-ref-8-1',
        title: 'Head Down Season',
        artist: 'Benji & the Silhouettes',
        album: 'Head Down Season',
        durationMs: 240000,
        trackNumber: 1,
        audioUrl: 'https://cdn.freesound.org/previews/612/612604_5674468-lq.mp3'
      }
    ]
  }
];
