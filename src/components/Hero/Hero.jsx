export const Hero = () => (
  <div className="hero-scene" aria-hidden="true">
    <svg className="hero-sky" viewBox="0 0 1280 860" preserveAspectRatio="xMidYMid slice" fill="none">
      <path
        d="M640 96 L640 60 M622 78 A 26 26 0 1 0 662 62 A 21 21 0 1 1 622 78 Z"
        stroke="#BFD4E6"
        strokeWidth="1"
        opacity="0.5"
      />
      <g stroke="#BFD4E6" strokeWidth="0.7" opacity="0.22">
        <path d="M0 236 C 220 196, 430 268, 640 232 S 1080 190, 1280 240" />
        <path d="M0 292 C 250 258, 480 322, 700 288 S 1090 252, 1280 296" />
      </g>
    </svg>

    <svg className="hero-castle" viewBox="0 0 1280 380" preserveAspectRatio="none">
      <path
        d="M0 380 L0 310 L70 310 L70 260 L95 205 L120 260 L120 310 L190 310 L190 230 L215 160 L240 230 L240 310 L320 310 L320 180 L350 95 L380 180 L380 310 L470 310 L470 240 L495 175 L520 240 L520 310 L610 310 L610 150 L645 58 L680 150 L680 310 L780 310 L780 235 L805 170 L830 235 L830 310 L910 310 L910 195 L940 115 L970 195 L970 310 L1060 310 L1060 255 L1085 200 L1110 255 L1110 310 L1190 310 L1190 275 L1215 230 L1240 275 L1240 310 L1280 310 L1280 380 Z"
        fill="#04060B"
      />
      <g fill="#D8E6F2" className="hero-windows">
        <rect x="86" y="272" width="7" height="12" rx="3" />
        <rect x="208" y="248" width="7" height="13" rx="3" />
        <rect x="341" y="200" width="8" height="14" rx="4" />
        <rect x="488" y="256" width="7" height="12" rx="3" />
        <rect x="637" y="170" width="9" height="16" rx="4" />
        <rect x="798" y="252" width="7" height="12" rx="3" />
        <rect x="932" y="214" width="8" height="14" rx="4" />
        <rect x="1078" y="268" width="7" height="12" rx="3" />
      </g>
    </svg>

    <svg className="hero-candles" viewBox="0 0 1280 150" preserveAspectRatio="none">
      <g>
        <rect x="120" y="58" width="13" height="92" fill="#080C13" />
        <ellipse cx="126.5" cy="50" rx="5" ry="10" fill="#FFD9A0" className="hero-flame" />
        <rect x="352" y="44" width="13" height="106" fill="#080C13" />
        <ellipse cx="358.5" cy="36" rx="5" ry="10" fill="#FFD9A0" className="hero-flame" />
        <rect x="470" y="94" width="12" height="56" fill="#080C13" />
        <ellipse cx="476" cy="86" rx="4.2" ry="8.6" fill="#FFD9A0" className="hero-flame" />
        <rect x="800" y="90" width="12" height="60" fill="#080C13" />
        <ellipse cx="806" cy="82" rx="4.4" ry="9" fill="#FFD9A0" className="hero-flame" />
        <rect x="918" y="52" width="13" height="98" fill="#080C13" />
        <ellipse cx="924.5" cy="44" rx="5" ry="10" fill="#FFD9A0" className="hero-flame" />
        <rect x="1152" y="62" width="13" height="88" fill="#080C13" />
        <ellipse cx="1158.5" cy="54" rx="5" ry="10" fill="#FFD9A0" className="hero-flame" />
      </g>
    </svg>
  </div>
);
