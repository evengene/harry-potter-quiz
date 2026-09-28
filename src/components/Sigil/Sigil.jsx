/**
 * The alchemical figure: circle, inscribed triangle, square, inner circle
 * and diamond. Drawn rather than an image so it scales cleanly, takes its
 * colour from CSS, and can be animated later.
 */
export const Sigil = ({ className = 'sigil' }) => (
  <svg
    className={className}
    viewBox="0 0 400 400"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.1"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="200" cy="200" r="182" />
    <circle cx="200" cy="200" r="172" />
    <path d="M200 28 L349 287 L51 287 Z" />
    <rect x="112" y="112" width="176" height="176" />
    <circle cx="200" cy="200" r="88" />
    <path d="M200 112 L288 200 L200 288 L112 200 Z" />
    <path d="M200 18 V0 M200 400 V382 M18 200 H0 M400 200 H382" />
    <circle cx="200" cy="28" r="4.5" fill="currentColor" stroke="none" />
    <circle cx="349" cy="287" r="4.5" fill="currentColor" stroke="none" />
    <circle cx="51" cy="287" r="4.5" fill="currentColor" stroke="none" />
  </svg>
);
