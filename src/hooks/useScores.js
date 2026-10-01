import { useEffect, useState } from 'react';

import { loadScores, subscribeToScores } from '../scores';

export const useScores = () => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    let alive = true;
    loadScores().then((stored) => {
      if (alive) setScores(stored);
    });

    const unsubscribe = subscribeToScores(setScores);
    return () => {
      alive = false;
      unsubscribe();
    };
  }, []);

  return scores;
};
