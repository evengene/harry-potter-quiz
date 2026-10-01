export const COPY = {
  eyebrow: 'Choose your trial',
  title: 'Three volumes',
  cue: 'Scroll to explore',
  chapterEyebrow: 'Level',
  begin: 'Start quiz',
}

/**
 * The camera journey only works on a viewport at least this wide for its
 * height. Coverage of a 16:9 artwork under object-fit: cover works out to
 * `viewport aspect / 1.78`, so at 3:2 you still see ~84% of the drawing and
 * at 4:3 only 75%. Portrait phones see 26% and portrait iPads 42% — not a
 * castle any more — so anything narrower gets the level sheet instead.
 */
export const WIDE_VIEWPORT = '(min-aspect-ratio: 3/2)';

// mobile.jpg is its own portrait composition rather than a crop of the wide
// artwork, so each level carries a second anchor for it. Its 2400x3000 ratio
// lives on .hero-frame in the stylesheet, which those anchors resolve against.

/**
 * The camera climbs as difficulty rises: low and left at the foot of the
 * castle, then the centre, then high in the far spires. Varying height as
 * well as position stops the three stops reading as "another tower".
 *
 * One entry per difficulty, and the single source of truth for where the
 * camera goes. `anchor` is a point on the artwork as a percentage — the
 * camera rests on it, and the guide line points at it, so the two can
 * never drift apart.
 *
 * `side` puts the text on the opposite side each time, so the callout
 * never sits over the part of the castle it is describing.
 *
 * `labelDrop` lowers the text block (in svh) without moving the anchor,
 * for stops high in the frame where a centred block would ride up under
 * the nav. A hairline elbow keeps it joined to the node.
 */
export const LEVELS = [
  {
    id: 'easy',
    mobileAnchor: { x: 23, y: 49 },
    labelDrop: 0,
    name: 'Easy',
    place: 'Great Hall',
    note: 'First years welcome',
    spine: 10,
    zoom: 1.55,
    anchor: { x: 38, y: 49 },
    side: 'right',
    region: { x1: 35, y1: 38, x2: 43, y2: 53 },
    blurb: 'Welcome to the Great Hall - the heart of Hogwarts and the perfect place to start',
  },
  {
    id: 'medium',
    mobileAnchor: { x: 77, y: 55 },
    labelDrop: 0,
    name: 'Medium',
    place: 'East Tower',
    note: 'For the well read',
    spine: 22,
    zoom: 2.05,
    anchor: { x: 63, y: 54 },
    side: 'left',
    region: { x1: 61, y1: 49, x2: 65, y2: 59 },
    blurb: 'The East Tower rewards those who have done their homework.',
  },
  {
    id: 'hard',
    mobileAnchor: { x: 41, y: 31 },
    labelDrop: 14,
    name: 'Hard',
    place: 'Headmaster\u2019s Tower',
    note: 'Restricted section',
    spine: 38,
    zoom: 2.7,
    anchor: { x: 45, y: 26 },
    side: 'left',
    region: { x1: 41, y1: 21, x2: 49, y2: 33 },
    blurb: 'The Headmaster’s Tower is reserved for those who know Hogwarts inside and out.',
  },
]

export const getLevel = (id) => {
  const index = LEVELS.findIndex((level) => level.id === id);
  const found = index >= 0 ? index : 0;
  return { ...LEVELS[found], number: found + 1 };
};
