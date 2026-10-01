import { describe, it, expect } from 'vitest';

import { mergeScore, isBeaten, HISTORY_LIMIT } from './scores';

describe('mergeScore', () => {
  it('stores a first result', () => {
    expect(mergeScore({}, 'easy', 7, 10)).toEqual({
      easy: { best: 7, last: 7, total: 10, runs: 1, history: [7] },
    });
  });

  it('keeps the higher score and counts the run', () => {
    const after = mergeScore({ easy: { best: 9, total: 10, runs: 3, history: [9] } }, 'easy', 4, 10);
    expect(after.easy).toMatchObject({ best: 9, last: 4, runs: 4, history: [9, 4] });
  });

  it('records what the last run scored, not just the best', () => {
    let all = mergeScore({}, 'easy', 8, 10);
    all = mergeScore(all, 'easy', 3, 10);

    expect(all.easy.best).toBe(8);
    expect(all.easy.last).toBe(3);
  });

  it('keeps the run history in order and caps its length', () => {
    let all = {};
    for (let i = 0; i < HISTORY_LIMIT + 5; i += 1) all = mergeScore(all, 'easy', i, 10);

    expect(all.easy.history).toHaveLength(HISTORY_LIMIT);
    expect(all.easy.history.at(-1)).toBe(HISTORY_LIMIT + 4);
    expect(all.easy.runs).toBe(HISTORY_LIMIT + 5);
  });

  it('copes with a record saved before history existed', () => {
    const after = mergeScore({ easy: { best: 6, total: 10, runs: 2 } }, 'easy', 7, 10);

    expect(after.easy.history).toEqual([7]);
    expect(after.easy.best).toBe(7);
    expect(after.easy.runs).toBe(3);
  });

  it('raises the best when beaten', () => {
    const after = mergeScore({ easy: { best: 4, total: 10, runs: 1 } }, 'easy', 8, 10);
    expect(after.easy.best).toBe(8);
  });

  it('leaves the other levels alone', () => {
    const before = { easy: { best: 9, total: 10, runs: 2, history: [9] } };
    const after = mergeScore(before, 'hard', 3, 10);

    expect(after.easy).toEqual(before.easy);
    expect(after.hard).toMatchObject({ best: 3, last: 3, runs: 1, history: [3] });
  });
});

describe('isBeaten', () => {
  it('is true the first time a level is played', () => {
    expect(isBeaten({}, 'easy', 0)).toBe(true);
  });

  it('is true only when the previous best is passed', () => {
    const all = { easy: { best: 6, total: 10, runs: 1 } };

    expect(isBeaten(all, 'easy', 7)).toBe(true);
    expect(isBeaten(all, 'easy', 6)).toBe(false);
    expect(isBeaten(all, 'easy', 5)).toBe(false);
  });
});
