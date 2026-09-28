import { describe, it, expect } from 'vitest';

import { getScore, getMessageBasedOnScore } from './Result.utils';
import { COPY } from './Result.constants';

describe('getScore', () => {
  it('counts only the correct answers', () => {
    const answers = [
      { isCorrect: true, idx: 0 },
      { isCorrect: false, idx: 1 },
      { isCorrect: true, idx: 2 },
    ];
    expect(getScore(answers)).toBe(2);
  });

  it('is zero when nothing was answered', () => {
    expect(getScore([])).toBe(0);
  });

  it('is zero when everything was wrong', () => {
    expect(getScore([{ isCorrect: false, idx: 0 }, { isCorrect: false, idx: 1 }])).toBe(0);
  });

  it('copes with gaps left by skipped questions', () => {
    const sparse = [];
    sparse[0] = { isCorrect: true, idx: 0 };
    sparse[3] = { isCorrect: true, idx: 2 };
    expect(getScore(sparse)).toBe(2);
  });
});

describe('getMessageBasedOnScore', () => {
  it('celebrates a perfect score', () => {
    expect(getMessageBasedOnScore(10, 10)).toBe(COPY.perfect);
  });

  it('is encouraging at 80 per cent', () => {
    expect(getMessageBasedOnScore(8, 10)).toBe(COPY.excellent);
  });

  it('is encouraging at 60 per cent', () => {
    expect(getMessageBasedOnScore(6, 10)).toBe(COPY.good);
  });

  it('is encouraging at 40 per cent', () => {
    expect(getMessageBasedOnScore(4, 10)).toBe(COPY.average);
  });

  // Regression: both of these used to return COPY.average, so scoring
  // nothing at all congratulated the player with "Good effort!".
  it('gives the low-score message below 40 per cent', () => {
    expect(getMessageBasedOnScore(3, 10)).toBe(COPY.low);
  });

  it('gives the low-score message for zero', () => {
    expect(getMessageBasedOnScore(0, 10)).toBe(COPY.low);
  });

  it('picks the right message either side of a boundary', () => {
    expect(getMessageBasedOnScore(7, 10)).toBe(COPY.good);
    expect(getMessageBasedOnScore(9, 10)).toBe(COPY.excellent);
  });
});
