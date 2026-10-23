/**
 * Self-contained SVG album artworks for Spindle.
 * Guarantee 100% offline reliability, zero CORS errors, and razor-sharp retro vinyl aesthetic.
 */

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const ALBUM_COVERS = {
  kindOfBlue: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="bg" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#1B3854"/>
          <stop offset="60%" stop-color="#0E1E2E"/>
          <stop offset="100%" stop-color="#070F17"/>
        </radialGradient>
        <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E5C77A"/>
          <stop offset="100%" stop-color="#9C772F"/>
        </linearGradient>
      </defs>
      <!-- Solid Jacket Ground -->
      <rect width="600" height="600" fill="url(#bg)"/>
      
      <!-- Vintage Columbia-style Header Banner -->
      <rect x="0" y="0" width="600" height="85" fill="#0A131C"/>
      <line x1="0" y1="85" x2="600" y2="85" stroke="#E5C77A" stroke-width="2"/>
      <text x="35" y="52" fill="#E5C77A" font-family="'Bricolage Grotesque', sans-serif" font-size="28" font-weight="800" letter-spacing="4">COLUMBIA</text>
      <text x="35" y="72" fill="#7D98B3" font-family="'Instrument Sans', sans-serif" font-size="12" letter-spacing="6">GUARANTEED HIGH FIDELITY • CL 1355</text>
      <circle cx="545" cy="42" r="18" fill="none" stroke="#E5C77A" stroke-width="2"/>
      <polygon points="545,30 553,46 537,46" fill="#E5C77A"/>

      <!-- Graphic Trumpet Silhouette & Echo Rings -->
      <g transform="translate(300, 310)">
        <circle cx="0" cy="0" r="160" fill="none" stroke="#254A6E" stroke-width="2" opacity="0.4"/>
        <circle cx="0" cy="0" r="120" fill="none" stroke="#356696" stroke-width="2" opacity="0.6"/>
        <circle cx="0" cy="0" r="80" fill="none" stroke="#E5C77A" stroke-width="2" opacity="0.5"/>
        <path d="M-90,-20 C-30,-70 60,-60 110,-10 L130,-30 L130,30 L110,10 C60,60 -30,70 -90,20 Z" fill="url(#brassGrad)" opacity="0.9"/>
        <circle cx="-90" cy="0" r="14" fill="#E5C77A"/>
      </g>

      <!-- Typography -->
      <text x="40" y="490" fill="#FFFFFF" font-family="'Bricolage Grotesque', sans-serif" font-size="46" font-weight="900" letter-spacing="-1">KIND OF BLUE</text>
      <text x="40" y="528" fill="#E5C77A" font-family="'Bricolage Grotesque', sans-serif" font-size="24" font-weight="600" letter-spacing="1">MILES DAVIS</text>
      <text x="40" y="556" fill="#8CA4BD" font-family="'Instrument Sans', sans-serif" font-size="14" letter-spacing="2">with John Coltrane • Cannonball Adderley • Bill Evans</text>
    </svg>
  `),

  tokyoLofi: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <linearGradient id="neonSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#140A1E"/>
          <stop offset="45%" stop-color="#311138"/>
          <stop offset="85%" stop-color="#802050"/>
          <stop offset="100%" stop-color="#C84858"/>
        </linearGradient>
      </defs>
      <!-- Sky Ground -->
      <rect width="600" height="600" fill="url(#neonSky)"/>
      
      <!-- Retro Neon Sun / Moon -->
      <circle cx="300" cy="270" r="110" fill="#FF5E7E" opacity="0.9"/>
      <!-- Sun blind slats -->
      <rect x="180" y="270" width="240" height="6" fill="#140A1E"/>
      <rect x="180" y="290" width="240" height="8" fill="#140A1E"/>
      <rect x="180" y="315" width="240" height="12" fill="#140A1E"/>
      <rect x="180" y="345" width="240" height="16" fill="#140A1E"/>

      <!-- Tokyo Skyline Silhouette -->
      <path d="M0,450 L40,450 L40,410 L70,410 L70,450 L110,450 L110,380 L130,380 L130,340 L140,340 L140,450 L190,450 L190,420 L230,420 L230,450 L270,450 L270,360 L285,310 L300,310 L315,360 L315,450 L370,450 L370,390 L410,390 L410,450 L460,450 L460,370 L490,370 L490,450 L540,450 L540,430 L600,430 L600,600 L0,600 Z" fill="#0C0512"/>

      <!-- Japanese Kanji & Typography -->
      <text x="45" y="85" fill="#FF8CA3" font-family="'Bricolage Grotesque', sans-serif" font-size="38" font-weight="900" letter-spacing="3">深夜 • 東京</text>
      <text x="45" y="125" fill="#FFFFFF" font-family="'Bricolage Grotesque', sans-serif" font-size="28" font-weight="700">MIDNIGHT TOKYO</text>
      <text x="45" y="152" fill="#F4A261" font-family="'Instrument Sans', sans-serif" font-size="15" letter-spacing="4">ANALOG 4-TRACK CASSETTE TAPE CUT</text>

      <rect x="420" y="45" width="135" height="40" rx="6" fill="#0C0512" stroke="#FF5E7E" stroke-width="1.5"/>
      <text x="435" y="70" fill="#FF5E7E" font-family="'Instrument Sans', sans-serif" font-size="13" font-weight="700" letter-spacing="2">SP-404 PRO</text>
    </svg>
  `),

  motownSoul: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="soulBurst" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#E28738"/>
          <stop offset="60%" stop-color="#9C4416"/>
          <stop offset="100%" stop-color="#1B0A05"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#soulBurst)"/>
      
      <!-- Concentric Vintage Soul Rings -->
      <circle cx="300" cy="300" r="230" fill="none" stroke="#FDE293" stroke-width="3" opacity="0.3"/>
      <circle cx="300" cy="300" r="180" fill="none" stroke="#FDE293" stroke-width="1.5" opacity="0.4"/>
      <circle cx="300" cy="300" r="130" fill="#180702" stroke="#FDE293" stroke-width="4"/>

      <!-- Center Starburst Badge -->
      <polygon points="300,210 325,270 390,275 340,315 355,380 300,345 245,380 260,315 210,275 275,270" fill="#FDE293"/>
      <circle cx="300" cy="300" r="24" fill="#9C4416"/>

      <!-- Typography -->
      <text x="300" y="105" text-anchor="middle" fill="#FDE293" font-family="'Bricolage Grotesque', sans-serif" font-size="44" font-weight="900" letter-spacing="3">MOTOWN SOUL</text>
      <text x="300" y="140" text-anchor="middle" fill="#FFFFFF" font-family="'Instrument Sans', sans-serif" font-size="16" letter-spacing="6">DETROIT RHYTHM SECTION • 1968</text>
      <text x="300" y="520" text-anchor="middle" fill="#FDE293" font-family="'Bricolage Grotesque', sans-serif" font-size="26" font-weight="700" letter-spacing="1">DUSTY BRASS &amp; TAPE SATURATION</text>
      <text x="300" y="550" text-anchor="middle" fill="#D39E70" font-family="'Instrument Sans', sans-serif" font-size="13" letter-spacing="4">STEREO MASTERING • 180G VINYL</text>
    </svg>
  `),

  bossaNova: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <linearGradient id="bossaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1B382B"/>
          <stop offset="50%" stop-color="#2D5A46"/>
          <stop offset="100%" stop-color="#0E1D16"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#bossaGrad)"/>

      <!-- Geometric Brazilian Mid-century Shapes -->
      <circle cx="300" cy="270" r="140" fill="#E6AF2E" opacity="0.85"/>
      <path d="M160,270 A140,140 0 0,0 440,270 Z" fill="#C93B2B" opacity="0.9"/>
      
      <!-- Palm leaf silhouette -->
      <path d="M300,150 Q360,220 300,360 Q240,220 300,150 Z" fill="#1B382B"/>
      <line x1="300" y1="150" x2="300" y2="360" stroke="#E6AF2E" stroke-width="2"/>

      <!-- Typography -->
      <rect x="0" y="440" width="600" height="160" fill="#0E1D16"/>
      <line x1="0" y1="440" x2="600" y2="440" stroke="#E6AF2E" stroke-width="3"/>
      <text x="50" y="500" fill="#FFFFFF" font-family="'Bricolage Grotesque', sans-serif" font-size="40" font-weight="900" letter-spacing="-0.5">VINTAGE BOSSA NOVA</text>
      <text x="50" y="538" fill="#E6AF2E" font-family="'Bricolage Grotesque', sans-serif" font-size="22" font-weight="600">ASTRUD &amp; RIO TRIO • 1964</text>
      <text x="50" y="568" fill="#A8C9B8" font-family="'Instrument Sans', sans-serif" font-size="13" letter-spacing="3">IPANEMA RECORDED IN RIO DE JANEIRO</text>
    </svg>
  `),

  blueNote: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <!-- Iconic Reid Miles Bold Split Graphic -->
      <rect width="600" height="600" fill="#0C1420"/>
      <rect x="0" y="0" width="600" height="280" fill="#1C385C"/>

      <!-- Blue Note Logo Header -->
      <text x="45" y="65" fill="#E5AA38" font-family="'Bricolage Grotesque', sans-serif" font-size="34" font-weight="900" letter-spacing="2">BLUE NOTE</text>
      <text x="470" y="65" fill="#FFFFFF" font-family="'Instrument Sans', sans-serif" font-size="18" font-weight="700" letter-spacing="3">4001</text>
      <line x1="45" y1="85" x2="555" y2="85" stroke="#FFFFFF" stroke-width="2" opacity="0.3"/>

      <!-- Gigantic Typography Motif -->
      <text x="45" y="170" fill="#FFFFFF" font-family="'Bricolage Grotesque', sans-serif" font-size="52" font-weight="900" letter-spacing="-1">ECHOES</text>
      <text x="45" y="240" fill="#E5AA38" font-family="'Bricolage Grotesque', sans-serif" font-size="52" font-weight="900" letter-spacing="-1">OF BLUE</text>

      <!-- Lower Half: Francis Wolff style monochrome block -->
      <circle cx="440" cy="430" r="110" fill="#14243A" stroke="#E5AA38" stroke-width="3"/>
      <!-- Saxophone key pattern -->
      <circle cx="410" cy="400" r="14" fill="#E5AA38"/>
      <circle cx="440" cy="430" r="14" fill="#E5AA38"/>
      <circle cx="470" cy="460" r="14" fill="#E5AA38"/>
      <line x1="390" y1="380" x2="490" y2="480" stroke="#FFFFFF" stroke-width="3"/>

      <text x="45" y="380" fill="#FFFFFF" font-family="'Bricolage Grotesque', sans-serif" font-size="28" font-weight="700">THE 33⅓ HARD BOP QUINTET</text>
      <text x="45" y="420" fill="#8EA9C7" font-family="'Instrument Sans', sans-serif" font-size="14" letter-spacing="2">HACKENSACK, NEW JERSEY STUDIO SESSIONS</text>
      <text x="45" y="450" fill="#8EA9C7" font-family="'Instrument Sans', sans-serif" font-size="14" letter-spacing="2">VAN GELDER MASTERED ACETATE</text>
    </svg>
  `),

  goldenHipHop: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <radialGradient id="hiphopBg" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stop-color="#3A170F"/>
          <stop offset="70%" stop-color="#1E0B07"/>
          <stop offset="100%" stop-color="#0A0402"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#hiphopBg)"/>

      <!-- Vinyl Crate Diggers Stamp Graphic -->
      <rect x="50" y="50" width="500" height="500" fill="none" stroke="#C45A33" stroke-width="4" stroke-dasharray="14 10"/>
      <circle cx="300" cy="270" r="130" fill="#140603" stroke="#F1875E" stroke-width="3"/>

      <!-- MPC Drum Pad Grid -->
      <g transform="translate(230, 200)">
        <rect x="0" y="0" width="30" height="30" rx="4" fill="#C45A33"/>
        <rect x="40" y="0" width="30" height="30" rx="4" fill="#F1875E"/>
        <rect x="80" y="0" width="30" height="30" rx="4" fill="#C45A33"/>
        <rect x="120" y="0" width="30" height="30" rx="4" fill="#F1875E"/>
        <rect x="0" y="40" width="30" height="30" rx="4" fill="#F1875E"/>
        <rect x="40" y="40" width="30" height="30" rx="4" fill="#C45A33"/>
        <rect x="80" y="40" width="30" height="30" rx="4" fill="#F1875E"/>
        <rect x="120" y="40" width="30" height="30" rx="4" fill="#C45A33"/>
        <rect x="0" y="80" width="30" height="30" rx="4" fill="#C45A33"/>
        <rect x="40" y="80" width="30" height="30" rx="4" fill="#F1875E"/>
        <rect x="80" y="80" width="30" height="30" rx="4" fill="#C45A33"/>
        <rect x="120" y="80" width="30" height="30" rx="4" fill="#F1875E"/>
      </g>

      <!-- Stamped Bold Typography -->
      <text x="300" y="450" text-anchor="middle" fill="#FFFFFF" font-family="'Bricolage Grotesque', sans-serif" font-size="40" font-weight="900" letter-spacing="1">GOLDEN ERA BREAKS</text>
      <text x="300" y="490" text-anchor="middle" fill="#F1875E" font-family="'Bricolage Grotesque', sans-serif" font-size="20" font-weight="700" letter-spacing="3">CRATE DIGGERS ANONYMOUS • 1994</text>
      <text x="300" y="520" text-anchor="middle" fill="#C59B88" font-family="'Instrument Sans', sans-serif" font-size="13" letter-spacing="4">RAW VINYL SAMPLES &amp; BOOM BAP DRUMS</text>
    </svg>
  `)
};
