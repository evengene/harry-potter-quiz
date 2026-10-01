import { useEffect, useState } from 'react';

/**
 * Live media query. Matching is read on mount and then kept in sync, so a
 * rotated phone or a resized window switches layout instead of keeping
 * whichever branch happened to render first.
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    try {
      return window.matchMedia(query).matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    let mql;
    try {
      mql = window.matchMedia(query);
    } catch {
      return undefined;
    }
    const onChange = (event) => setMatches(event.matches);
    // No sync read here: the lazy initialiser above already has the value as
    // of this mount, and re-reading it during the effect only costs a second
    // render pass. Anything that changes afterwards arrives on 'change'.
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};
