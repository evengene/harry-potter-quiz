import { describe, it, expect } from 'vitest';

import reducer, { answer, goBack, quizStart, restart, setLevel } from './quizSlice';
import { getQuestions } from './components/Quiz/Quiz.constants';

const initial = reducer(undefined, { type: '@@INIT' });
const mediumTotal = getQuestions('medium').length;
const hardTotal = getQuestions('hard').length;
const lastIdx = mediumTotal - 1;

describe('initial state', () => {
  it('starts on the first question with nothing answered', () => {
    expect(initial).toEqual({
      questionIdx: 0,
      answers: [],
      showScore: false,
      hasStarted: false,
      level: 'medium',
    });
  });
});

describe('quizStart', () => {
  it('marks the quiz as started', () => {
    expect(reducer(initial, quizStart()).hasStarted).toBe(true);
  });

  it('leaves the player on the first question', () => {
    expect(reducer(initial, quizStart()).questionIdx).toBe(0);
  });
});

describe('setLevel', () => {
  it('records the chosen difficulty', () => {
    expect(reducer(initial, setLevel('hard')).level).toBe('hard');
  });

  it('does not start the quiz on its own', () => {
    expect(reducer(initial, setLevel('hard')).hasStarted).toBe(false);
  });

  it('clears a finished run', () => {
    const finished = {
      questionIdx: lastIdx,
      answers: Array(mediumTotal).fill({ isCorrect: true, idx: 0 }),
      showScore: true,
      hasStarted: true,
      level: 'medium',
    };
    const next = reducer(finished, setLevel('hard'));
    expect(next).toEqual({ ...initial, level: 'hard' });
  });
});

describe('question sets', () => {
  it('ends the quiz at the end of the chosen level, not a fixed length', () => {
    const onLastHard = {
      ...initial,
      level: 'hard',
      questionIdx: hardTotal - 1,
      hasStarted: true,
    };
    expect(reducer(onLastHard, answer({ isCorrect: true, idx: 0 })).showScore).toBe(true);
  });

  it('does not end early on a longer set at the same index', () => {
    const sameIdxOnMedium = {
      ...initial,
      level: 'medium',
      questionIdx: hardTotal - 1,
      hasStarted: true,
    };
    expect(reducer(sameIdxOnMedium, answer({ isCorrect: true, idx: 0 })).showScore).toBe(false);
  });

  it('falls back to medium for an unknown level', () => {
    expect(getQuestions('nonsense')).toBe(getQuestions('medium'));
  });

  it('gives every question exactly one correct answer and four options', () => {
    ['easy', 'medium', 'hard'].forEach((level) => {
      getQuestions(level).forEach((q) => {
        expect(q.answerOptions).toHaveLength(4);
        expect(q.answerOptions.filter((o) => o.isCorrect)).toHaveLength(1);
        expect(q.questionText.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('answer', () => {
  it('records the answer in the current question slot', () => {
    const next = reducer(initial, answer({ isCorrect: true, idx: 2 }));
    expect(next.answers[0]).toEqual({ isCorrect: true, idx: 2 });
  });

  it('moves on to the next question', () => {
    const next = reducer(initial, answer({ isCorrect: false, idx: 0 }));
    expect(next.questionIdx).toBe(1);
  });

  it('does not end the quiz early', () => {
    expect(reducer(initial, answer({ isCorrect: true, idx: 0 })).showScore).toBe(false);
  });

  it('ends the quiz on the last question', () => {
    const onLast = { ...initial, questionIdx: lastIdx, hasStarted: true };
    expect(reducer(onLast, answer({ isCorrect: true, idx: 1 })).showScore).toBe(true);
  });

  it('does not advance past the last question', () => {
    const onLast = { ...initial, questionIdx: lastIdx, hasStarted: true };
    expect(reducer(onLast, answer({ isCorrect: true, idx: 1 })).questionIdx).toBe(lastIdx);
  });

  it('replaces the old answer when a question is answered again', () => {
    const changedMind = {
      ...initial,
      questionIdx: 1,
      answers: [
        { isCorrect: true, idx: 0 },
        { isCorrect: false, idx: 3 },
      ],
      hasStarted: true,
    };
    const next = reducer(changedMind, answer({ isCorrect: true, idx: 1 }));
    expect(next.answers[1]).toEqual({ isCorrect: true, idx: 1 });
    expect(next.answers).toHaveLength(2);
  });

  it('does not modify the state it was given', () => {
    const before = { ...initial, answers: [], hasStarted: true };
    reducer(before, answer({ isCorrect: true, idx: 0 }));
    expect(before.answers).toEqual([]);
    expect(before.questionIdx).toBe(0);
  });
});

describe('goBack', () => {
  it('steps back one question', () => {
    expect(reducer({ ...initial, questionIdx: 3 }, goBack()).questionIdx).toBe(2);
  });

  it('never goes below the first question', () => {
    expect(reducer(initial, goBack()).questionIdx).toBe(0);
  });

  it('keeps the answers already given', () => {
    const state = {
      ...initial,
      questionIdx: 2,
      answers: [
        { isCorrect: true, idx: 0 },
        { isCorrect: false, idx: 1 },
      ],
    };
    expect(reducer(state, goBack()).answers).toHaveLength(2);
  });
});

describe('restart', () => {
  const finished = {
    questionIdx: lastIdx,
    answers: Array(mediumTotal).fill({ isCorrect: true, idx: 0 }),
    showScore: true,
    hasStarted: true,
    level: 'medium',
  };

  it('clears everything back to the beginning', () => {
    expect(reducer(finished, restart())).toEqual(initial);
  });

  it('keeps the difficulty the player chose', () => {
    const onHard = { ...finished, level: 'hard' };
    expect(reducer(onHard, restart()).level).toBe('hard');
  });
});
