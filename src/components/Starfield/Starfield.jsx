/**
 * The atmosphere behind everything: three tiled star layers for depth,
 * plus motes that drift slowly upward so the background actually moves
 * rather than only pulsing. Pure CSS — transform and opacity only, so it
 * stays on the compositor — and it stops under prefers-reduced-motion.
 */

// left, size in px, seconds to cross, start offset, sideways drift.
// The offsets are NEGATIVE on purpose: a negative animation-delay starts
// the mote partway through its flight, so on arrival they are already
// spread up the screen instead of all queued at the bottom edge.
const MOTES = [
  ['6%', 3, 22, -2, '22px'],
  ['14%', 2, 28, -14, '-18px'],
  ['23%', 4, 19, -7, '30px'],
  ['31%', 2, 30, -22, '-26px'],
  ['42%', 3, 24, -11, '16px'],
  ['50%', 2, 26, -4, '-20px'],
  ['58%', 4, 20, -16, '24px'],
  ['67%', 2, 29, -9, '-14px'],
  ['75%', 3, 18, -13, '28px'],
  ['83%', 2, 27, -20, '-22px'],
  ['91%', 4, 21, -6, '18px'],
  ['97%', 2, 25, -17, '-16px'],
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
