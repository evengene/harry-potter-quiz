import localforage from 'localforage';

const KEY = 'by-level';
const CHANGED = 'quiz-scores-changed';

const store = localforage.createInstance({
  name: 'trivia-trials',
  storeName: 'scores',
});

export const HISTORY_LIMIT = 12;

export const mergeScore = (all, level, score, total) => {
  const previous = all[level];
  const history = [...(previous?.history ?? []), score].slice(-HISTORY_LIMIT);

  return {
    ...all,
    [level]: {
      best: previous ? Math.max(previous.best, score) : score,
      last: score,
      total,
      runs: (previous?.runs ?? 0) + 1,
      history,
    },
  };
};

export const isBeaten = (all, level, score) => {
  const previous = all[level];
  return !previous || score > previous.best;
};

export const loadScores = async () => {
  try {
    return (await store.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
};

export const recordScore = async (level, score, total) => {
  const all = await loadScores();
  const beaten = isBeaten(all, level, score);
  const next = mergeScore(all, level, score, total);

  try {
    await store.setItem(KEY, next);
  } catch {
    // Private browsing and blocked storage both throw; the run still counts
    // for this session, it just will not be remembered.
  }

  window.dispatchEvent(new CustomEvent(CHANGED, { detail: next }));
  return { beaten, best: next[level].best };
};

export const subscribeToScores = (onChange) => {
  const handler = (event) => onChange(event.detail);
  window.addEventListener(CHANGED, handler);
  return () => window.removeEventListener(CHANGED, handler);
};
