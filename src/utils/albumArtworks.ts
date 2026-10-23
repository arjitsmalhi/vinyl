/**
 * High-fidelity vector album artworks inspired directly by the reference images.
 * Loads 100% reliably and offline.
 */

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const ALBUM_COVERS = {
  // Reference Image 1: Emerald/turquoise clear pool water with swimmer
  lawOfAttraction: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="water" cx="45%" cy="50%" r="75%">
          <stop offset="0%" stop-color="#5FE3CD"/>
          <stop offset="40%" stop-color="#28B8A5"/>
          <stop offset="80%" stop-color="#146B60"/>
          <stop offset="100%" stop-color="#083832"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#water)"/>
      <!-- Water ripples and caustics -->
      <path d="M0,150 Q150,110 300,160 T600,140 L600,600 L0,600 Z" fill="#20A896" opacity="0.4"/>
      <path d="M0,320 Q200,280 400,340 T600,310 L600,600 L0,600 Z" fill="#147568" opacity="0.45"/>
      <circle cx="280" cy="300" r="180" fill="none" stroke="#A7F3D0" stroke-width="3" opacity="0.35"/>
      <circle cx="280" cy="300" r="120" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.4"/>
      <!-- Swimmer figure -->
      <g transform="translate(260, 280)">
        <ellipse cx="0" cy="0" rx="20" ry="34" fill="#E2E8F0" opacity="0.9" transform="rotate(-30)"/>
        <circle cx="-14" cy="-30" r="12" fill="#1E293B"/>
        <path d="M-8,14 Q-4,45 16,60" stroke="#38BDF8" stroke-width="14" fill="none" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="45" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.6"/>
      </g>
      <!-- Title on dark border -->
      <rect x="0" y="520" width="600" height="80" fill="#082823"/>
      <text x="35" y="565" fill="#FFFFFF" font-family="'Bricolage Grotesque', sans-serif" font-size="28" font-weight="800">LAW OF ATTRACTION</text>
      <text x="565" y="565" text-anchor="end" fill="#5FE3CD" font-family="'Instrument Sans', sans-serif" font-size="16" font-weight="600">SHE HER HERS</text>
    </svg>
  `),

  // Reference Image 2: Vibrant red/scarlet hands on satin
  chuloPt2: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="redGlow" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#FF3355"/>
          <stop offset="50%" stop-color="#B80D2D"/>
          <stop offset="100%" stop-color="#3D000A"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#redGlow)"/>
      <!-- Artistic metallic hands silhouette -->
      <g transform="translate(300, 310)">
        <ellipse cx="0" cy="0" rx="160" ry="180" fill="#750619" opacity="0.8"/>
        <!-- Stylized silver manicure fingers -->
        <path d="M-40,60 C-50,-20 -40,-90 -20,-140 C-10,-90 0,-20 0,60 Z" fill="#FFCCD5" opacity="0.95"/>
        <path d="M0,60 C-5,-30 5,-110 25,-160 C35,-110 40,-30 35,60 Z" fill="#FFE4E6" opacity="0.9"/>
        <path d="M40,70 C40,-10 55,-80 75,-120 C85,-80 80,-10 70,70 Z" fill="#FECDD3" opacity="0.85"/>
        <path d="M-80,80 C-85,10 -75,-50 -60,-80 C-50,-50 -45,10 -45,80 Z" fill="#FDA4AF" opacity="0.8"/>
      </g>
      <!-- Script typography -->
      <text x="50" y="90" fill="#FFCCD5" font-family="'Bricolage Grotesque', sans-serif" font-size="44" font-weight="900" letter-spacing="-1">CHULO PT. 2</text>
      <text x="50" y="125" fill="#FFA3B5" font-family="'Instrument Sans', sans-serif" font-size="18" font-weight="600">Bad Gyal • Tokischa • Young Miko</text>
    </svg>
  `),

  // Reference Image 3: Yellow/Amber Tyler cover
  seeYouAgain: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <rect width="600" height="600" fill="#F59E0B"/>
      <circle cx="300" cy="270" r="140" fill="#D97706"/>
      <circle cx="300" cy="270" r="110" fill="#B45309"/>
      <!-- Sunburst petals -->
      <circle cx="300" cy="270" r="60" fill="#78350F"/>
      <circle cx="300" cy="270" r="25" fill="#FEF3C7"/>
      <!-- Field green grass edge -->
      <path d="M0,480 Q150,440 300,480 T600,450 L600,600 L0,600 Z" fill="#15803D"/>
      <text x="50" y="90" fill="#451A03" font-family="'Bricolage Grotesque', sans-serif" font-size="40" font-weight="900">SEE YOU AGAIN</text>
      <text x="50" y="125" fill="#78350F" font-family="'Instrument Sans', sans-serif" font-size="18" font-weight="700">Tyler, The Creator feat. Kali Uchis</text>
    </svg>
  `),

  // Reference Image 3: Pink & Purple Loft Light Club
  projectorBlues: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <rect width="600" height="600" fill="#831843"/>
      <rect x="50" y="60" width="500" height="340" rx="16" fill="#F472B6"/>
      <rect x="70" y="80" width="460" height="300" rx="10" fill="#FDF2F8"/>
      <!-- Cloud animation projection -->
      <ellipse cx="300" cy="230" rx="120" ry="70" fill="#EC4899" opacity="0.8"/>
      <ellipse cx="230" cy="210" rx="70" ry="60" fill="#DB2777" opacity="0.9"/>
      <ellipse cx="370" cy="220" rx="60" ry="50" fill="#F472B6" opacity="0.9"/>
      <text x="50" y="470" fill="#FDF2F8" font-family="'Bricolage Grotesque', sans-serif" font-size="34" font-weight="900">PROJECTOR MONSTER BLUES</text>
      <text x="50" y="505" fill="#FBCFE8" font-family="'Instrument Sans', sans-serif" font-size="18" font-weight="600">Loft Light Club</text>
    </svg>
  `),

  // Reference Image 3: Peel Slowly Citrus prints
  peelSlowly: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <rect width="600" height="600" fill="#FDF8F0"/>
      <!-- Citrus fruit circles grid -->
      <circle cx="180" cy="220" r="60" fill="#F59E0B"/>
      <circle cx="300" cy="200" r="50" fill="#EF4444"/>
      <circle cx="420" cy="230" r="65" fill="#EAB308"/>
      <circle cx="230" cy="340" r="55" fill="#F97316"/>
      <circle cx="370" cy="330" r="60" fill="#84CC16"/>
      <!-- Shadows -->
      <ellipse cx="180" cy="285" rx="45" ry="10" fill="#292524" opacity="0.12"/>
      <ellipse cx="300" cy="255" rx="35" ry="8" fill="#292524" opacity="0.12"/>
      <ellipse cx="420" cy="300" rx="50" ry="12" fill="#292524" opacity="0.12"/>
      <text x="50" y="480" fill="#1C1917" font-family="'Bricolage Grotesque', sans-serif" font-size="42" font-weight="900">PEEL SLOWLY</text>
      <text x="50" y="515" fill="#78716C" font-family="'Instrument Sans', sans-serif" font-size="18" font-weight="600">Crush &amp; Pulp</text>
    </svg>
  `),

  // Reference Image 3: Channel After Midnight Terracotta Tile & Retro TV
  channelAfterMidnight: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <rect width="600" height="600" fill="#9A3412"/>
      <!-- Terracotta tile floor grid -->
      <g stroke="#7C2D12" stroke-width="2">
        <line x1="0" y1="280" x2="600" y2="280"/>
        <line x1="0" y1="360" x2="600" y2="360"/>
        <line x1="0" y1="440" x2="600" y2="440"/>
        <line x1="0" y1="520" x2="600" y2="520"/>
        <line x1="120" y1="280" x2="120" y2="600"/>
        <line x1="240" y1="280" x2="240" y2="600"/>
        <line x1="360" y1="280" x2="360" y2="600"/>
        <line x1="480" y1="280" x2="480" y2="600"/>
      </g>
      <!-- Retro TV set -->
      <rect x="230" y="180" width="140" height="110" rx="14" fill="#292524"/>
      <rect x="245" y="195" width="85" height="80" rx="8" fill="#F5F5F4"/>
      <circle cx="348" cy="215" r="8" fill="#D6D3D1"/>
      <circle cx="348" cy="240" r="8" fill="#D6D3D1"/>
      <text x="50" y="90" fill="#FFEDD5" font-family="'Bricolage Grotesque', sans-serif" font-size="34" font-weight="900">CHANNEL AFTER MIDNIGHT</text>
      <text x="50" y="125" fill="#FDBA74" font-family="'Instrument Sans', sans-serif" font-size="18" font-weight="600">Static Season</text>
    </svg>
  `),

  // Reference Image 3: Green Signal Ghost
  signalGhost: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <rect width="600" height="600" fill="#064E3B"/>
      <path d="M0,0 L600,0 L420,380 L180,380 Z" fill="#047857"/>
      <rect x="180" y="240" width="240" height="360" fill="#10B981"/>
      <!-- Grid corridor lines -->
      <line x1="0" y1="0" x2="180" y2="240" stroke="#A7F3D0" stroke-width="2" opacity="0.4"/>
      <line x1="600" y1="0" x2="420" y2="240" stroke="#A7F3D0" stroke-width="2" opacity="0.4"/>
      <text x="50" y="90" fill="#ECFDF5" font-family="'Bricolage Grotesque', sans-serif" font-size="40" font-weight="900">SIGNAL GHOST</text>
      <text x="50" y="125" fill="#A7F3D0" font-family="'Instrument Sans', sans-serif" font-size="18" font-weight="600">Floor Eleven</text>
    </svg>
  `),

  // Reference Image 3: Head Down Season (Black & White Moody)
  headDownSeason: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <rect width="600" height="600" fill="#18181B"/>
      <circle cx="300" cy="300" r="220" fill="#27272A"/>
      <circle cx="300" cy="300" r="160" fill="#3F3F46"/>
      <!-- Silhouette -->
      <path d="M220,450 C220,340 260,260 300,260 C340,260 380,340 380,450 Z" fill="#E4E4E7"/>
      <circle cx="300" cy="220" r="45" fill="#F4F4F5"/>
      <text x="50" y="90" fill="#FFFFFF" font-family="'Bricolage Grotesque', sans-serif" font-size="38" font-weight="900">HEAD DOWN SEASON</text>
      <text x="50" y="125" fill="#A1A1AA" font-family="'Instrument Sans', sans-serif" font-size="18" font-weight="600">Benji &amp; the Silhouettes</text>
    </svg>
  `)
};
