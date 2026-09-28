/**
 * The atmosphere behind everything: three tiled star layers for depth,
 * plus motes that drift slowly upward so the background actually moves
 * rather than only pulsing. Pure CSS — transform and opacity only, so it
 * stays on the compositor — and it stops under prefers-reduced-motion.
 */

// left, size in px, seconds to cross the screen, start delay, sideways drift
const MOTES = [
  ['6%', 3, 38, 0, '22px'],
  ['14%', 2, 52, 9, '-18px'],
  ['23%', 4, 44, 21, '30px'],
  ['31%', 2, 60, 5, '-26px'],
  ['42%', 3, 41, 15, '16px'],
  ['50%', 2, 55, 27, '-20px'],
  ['58%', 4, 47, 3, '24px'],
  ['67%', 2, 63, 18, '-14px'],
  ['75%', 3, 40, 11, '28px'],
  ['83%', 2, 57, 24, '-22px'],
  ['91%', 4, 49, 7, '18px'],
  ['97%', 2, 66, 31, '-16px'],
];

export const Starfield = () => (
  <div className="starfield" aria-hidden="true">
    <span className="stars stars-far" />
    <span className="stars stars-mid" />
    <span className="stars stars-near" />
    {MOTES.map(([left, size, dur, delay, drift], i) => (
      <span
        key={i}
        className="mote"
        style={{
          left,
          '--size': `${size}px`,
          '--dur': `${dur}s`,
          '--delay': `${delay}s`,
          '--drift': drift,
        }}
      />
    ))}
  </div>
);
