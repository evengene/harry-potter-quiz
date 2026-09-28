import castle from '../../assets/castle.jpg';

/**
 * The pinned "film" behind the landing chapters. A still that drifts very
 * slowly, so it reads as alive without the weight of video. If a looping
 * clip arrives later, it replaces the <img> and nothing else changes.
 */
export const Hero = () => (
  <div className="hero-scene" aria-hidden="true">
    <img className="hero-image" src={castle} alt="" />
    <div className="hero-veil" />
  </div>
);
