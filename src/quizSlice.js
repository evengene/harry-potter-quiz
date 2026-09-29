import { createSlice } from '@reduxjs/toolkit';

import { getQuestions } from './components/Quiz/Quiz.constants';

const initialState = {
  questionIdx: 0,
  answers: [],
  showScore: false,
  hasStarted: false, // guards /questions against direct visits and refreshes
  level: 'medium',
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    quizStart(state) {
      state.hasStarted = true;
    },

    setLevel(state, action) {
      return { ...initialState, level: action.payload };
    },

    answer(state, action) {
      const { isCorrect, idx } = action.payload;
      state.answers[state.questionIdx] = { isCorrect, idx };

      if (state.questionIdx + 1 >= getQuestions(state.level).length) {
        state.showScore = true;
      } else {
        state.questionIdx += 1;
      }
    },

    goBack(state) {
      state.questionIdx = Math.max(0, state.questionIdx - 1);
    },

    restart(state) {
      return { ...initialState, level: state.level };
    },
  },
});

export const { quizStart, setLevel, answer, goBack, restart } = quizSlice.actions;

export default quizSlice.reducer;
