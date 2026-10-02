import { useEffect, useRef } from 'react';

import sky from '../../assets/artwork/01-sky.jpg';
import stars from '../../assets/artwork/07-stars.png';
import moon from '../../assets/artwork/02-moon.png';
import clouds from '../../assets/artwork/03-clouds.png';
import mountains from '../../assets/artwork/05-mountains.png';
import castle from '../../assets/artwork/04-castle.png';
import windowsEasy from '../../assets/artwork/glowing-windows-level-1.png';
import windowsMedium from '../../assets/artwork/glowing-windows-level-2.png';
import windowsHard from '../../assets/artwork/glowing-windows-level-3.png';
import foreground from '../../assets/artwork/foreground-2.png';

/**
 * The scene is painted into a single canvas rather than stacked as ten
 * transformed elements.
 *
 * As separate DOM layers, each one became its own compositor layer and got
 * re-rasterised every time its scale changed — ten of those at once is what
 * made the whole stack flicker while scrolling. One canvas is one composited
 * layer, and drawImage just samples the decoded source, so changing scale
 * costs nothing to re-render.
 *
 * depth  how hard the layer follows the camera (far < 1 < near)
 * sway   ambient drift in px as [x, y], on its own period in seconds
 * pulse  ambient opacity range as [min, max], on its own period
 * base   the layer the camera and the callouts measure themselves against
 */
const LAYERS = [
  { src: sky, depth: 0.55 },
  { src: stars, depth: 0.6, pulse: [0.55, 1], period: 3.4 },
  { src: moon, depth: 0.7, sway: [-6, 7], period: 26 },
  { src: clouds, depth: 0.78, sway: [-18, 0], period: 64 },
  { src: mountains, depth: 0.9 },
  { src: castle, depth: 1, base: true },
  { src: windowsEasy, depth: 1, level: 0 },
  // The artwork's level-2 file marks the tall tower and level-3 the right
  // tower, which is the opposite way round from the difficulty order.
  { src: windowsHard, depth: 1, level: 1 },
  { src: windowsMedium, depth: 1, level: 2 },
  { src: foreground, depth: 1.32 },
];

const WINDOW_LIT = 1;
const WINDOW_DARK = 0.16;
const WINDOW_IDLE = 0.5;
const GLOW_FROM = 1.3;

const BASE_INDEX = LAYERS.findIndex((l) => l.base);

/**
 * Only ever mounted on a viewport of at least 3:2 — see WIDE_VIEWPORT.
 * Narrower than that, this artwork would be cropped past recognition and the
 * portrait layout runs off its own illustration instead.
 */
export const CastleStage = ({ camera }) => {
  const canvasRef = useRef(null);
  const readoutRef = useRef(null);

  // Add ?pick to the URL to turn the scene into a coordinate picker: click
  // anywhere and it reports that point as a percentage OF THE ARTWORK, which
  // is what an anchor in LEVELS wants. Screen position and artwork position
  // only coincide at the anchor itself, so reading them off the page by eye
  // gives numbers that land in empty sky.
  const picking =
    typeof window !== 'undefined' && window.location.search.includes('pick');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const images = LAYERS.map((layer) => {
      const img = new Image();
      img.src = layer.src;
      return img;
    });

    // Window brightness eases toward its target so arriving at a level warms
    // the wing up rather than snapping it on.
    const lit = LAYERS.map(() => WINDOW_IDLE);
    const pool = { value: 0, x: null, y: null };

    let frame = 0;
    let width = 0;
    let height = 0;

    // Re-measured every frame rather than only on window resize. Arriving
    // here by client-side navigation can run the effect before layout has
    // settled, and a canvas sized from a zero-height box never recovers.
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextW = Math.round(rect.width * dpr);
      const nextH = Math.round(rect.height * dpr);
      width = rect.width;
      height = rect.height;
      // Assigning width/height clears the canvas, so only do it on a change.
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW;
        canvas.height = nextH;
      }
      // Setting width/height resets the context, so the transform is
      // reapplied unconditionally.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    // Where a layer lands on the canvas. Everything that has to agree with
    // the artwork — the light pool, the shading, the picker — reads the base
    // layer's rect from here rather than recomputing it.
    const place = (img, layer, zoom, ox, oy) => {
      const basis = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const scale = basis * (1 + (zoom - 1) * layer.depth);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;

      // Keep the point at (ox, oy) of the artwork pinned to the same spot on
      // screen, which is what transform-origin does in CSS.
      return {
        x: width * (ox / 100) - w * (ox / 100),
        y: height * (oy / 100) - h * (oy / 100),
        w,
        h,
      };
    };

    const draw = (time) => {
      if (!resize()) {
        frame = requestAnimationFrame(draw);
        return;
      }

      // Don't clear until there is something to put back, otherwise a frame
      // that lands before the images decode wipes the scene to black.
      const ready = images.some((img) => img.complete && img.naturalWidth);
      if (!ready) {
        frame = requestAnimationFrame(draw);
        return;
      }

      const { zoom, ox, oy, active } = camera.current;
      const seconds = time / 1000;
      const zoomGlow = Math.min(Math.max((zoom - 1) / (GLOW_FROM - 1), 0), 1);
      let baseRect = null;

      ctx.clearRect(0, 0, width, height);

      LAYERS.forEach((layer, i) => {
        const img = images[i];
        if (!img.complete || !img.naturalWidth) return;

        let alpha = 1;
        if (layer.level !== undefined) {
          const target =
            active < 0 ? WINDOW_IDLE : active === layer.level ? WINDOW_LIT : WINDOW_DARK;
          lit[i] += (target - lit[i]) * 0.06;
          alpha = lit[i] * zoomGlow;
        } else if (layer.pulse) {
          const [lo, hi] = layer.pulse;
          const t = (Math.sin((seconds / layer.period) * Math.PI * 2) + 1) / 2;
          alpha = lo + (hi - lo) * t;
        }

        const rect = place(img, layer, zoom, ox, oy);
        if (layer.base) baseRect = rect;
        let { x, y } = rect;
        const { w, h } = rect;

        if (layer.sway) {
          const t = Math.sin((seconds / layer.period) * Math.PI * 2);
          x += layer.sway[0] * t;
          y += layer.sway[1] * t;
        }

        ctx.globalAlpha = alpha;
        ctx.drawImage(img, x, y, w, h);

        // A lit wing spills light onto the stone around it. Two extra
        // additive passes at increasing size is far cheaper than a real
        // blur and reads the same at this scale.
        if (layer.level !== undefined && alpha > WINDOW_DARK + 0.05) {
          const bloom = (grow, strength) => {
            const bw = w * grow;
            const bh = h * grow;
            ctx.globalAlpha = alpha * strength;
            ctx.drawImage(img, x - (bw - w) / 2, y - (bh - h) / 2, bw, bh);
          };
          ctx.globalCompositeOperation = 'lighter';
          bloom(1.012, 0.5);
          bloom(1.03, 0.28);
          ctx.globalCompositeOperation = 'source-over';
        }
      });

      if (!baseRect) {
        ctx.globalAlpha = 1;
        frame = requestAnimationFrame(draw);
        return;
      }

      // The point on the artwork the camera is resting on, in canvas pixels.
      // Eased, so the glow slides between levels instead of jumping.
      const gx = baseRect.x + baseRect.w * (ox / 100);
      const gy = baseRect.y + baseRect.h * (oy / 100);
      if (pool.x === null) {
        pool.x = gx;
        pool.y = gy;
      } else {
        pool.x += (gx - pool.x) * 0.08;
        pool.y += (gy - pool.y) * 0.08;
      }

      // A warm pool of light where the camera has come to rest, breathing
      // slowly. This is what makes arriving somewhere read as arriving —
      // the windows alone cover too little of the frame to register.
      const target = active < 0 ? 0 : 1;
      pool.value += (target - pool.value) * 0.05;
      if (pool.value > 0.01) {
        const radius = Math.max(width, height) * 0.5;
        const breathe = 0.85 + 0.15 * Math.sin((seconds / 4.2) * Math.PI * 2);
        const g = ctx.createRadialGradient(pool.x, pool.y, 0, pool.x, pool.y, radius);
        g.addColorStop(0, `rgba(255, 216, 158, ${0.2 * pool.value * breathe})`);
        g.addColorStop(0.45, `rgba(255, 206, 150, ${0.07 * pool.value * breathe})`);
        g.addColorStop(1, 'rgba(255, 200, 140, 0)');
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';

        // Everything that isn't the chosen wing falls into shadow.
        // Subtracting light elsewhere reads far more strongly than adding it
        // here, and it suits a night scene better than a brighter glow would.
        const clear = Math.min(width, height) * 0.3;
        const falloff = Math.max(width, height) * 0.78;
        const shade = ctx.createRadialGradient(pool.x, pool.y, clear, pool.x, pool.y, falloff);
        shade.addColorStop(0, 'rgba(4, 7, 12, 0)');
        shade.addColorStop(1, `rgba(4, 7, 12, ${0.62 * pool.value})`);
        ctx.globalAlpha = 1;
        ctx.fillStyle = shade;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const onPick = (event) => {
      const img = images[BASE_INDEX];
      if (!img.naturalWidth) return;
      const { zoom, ox, oy } = camera.current;
      const rect = canvas.getBoundingClientRect();
      const base = place(img, LAYERS[BASE_INDEX], zoom, ox, oy);

      const ax = ((event.clientX - rect.left - base.x) / base.w) * 100;
      const ay = ((event.clientY - rect.top - base.y) / base.h) * 100;
      const text = `anchor: { x: ${ax.toFixed(0)}, y: ${ay.toFixed(0)} }`;
      if (readoutRef.current) readoutRef.current.textContent = text;
      console.log(text);
    };

    if (picking) canvas.addEventListener('click', onPick);

    resize();
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('click', onPick);
    };
  }, [camera, picking]);

  return (
    <>
      <canvas ref={canvasRef} className="castle-canvas" aria-hidden="true" />
      {picking && (
        <output ref={readoutRef} className="castle-picker">
          click the scene to read its anchor
        </output>
      )}
    </>
  );
};
