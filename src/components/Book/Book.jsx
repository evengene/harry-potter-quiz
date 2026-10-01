import Logo from '../../assets/hp-logo.svg';

// The height the spine widths in LEVELS were drawn against. Passing the
// spine as a RATIO of this rather than in px is what lets the whole book be
// resized from one variable without the spine staying fat.
const DRAWN_AT = 236;

/**
 * The spine thickens with difficulty, which is the whole idea — three books
 * of visibly different weight. Shared by the portrait level sheet and the
 * reduced-motion list so the two can't drift apart.
 */
export const Book = ({ spine }) => (
  <span className="book" style={{ '--spine-ratio': spine / DRAWN_AT }}>
    <span className="book-spine" />
    <span className="book-cover">
      <img src={Logo} className="book-image" alt="" />
    </span>
    <span className="book-pages" />
  </span>
);
