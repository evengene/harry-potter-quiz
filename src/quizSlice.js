import { createSlice } from '@reduxjs/toolkit';

import { QUIZ_DATA } from './components/Quiz/Quiz.constants';

const initialState = {
  questionIdx: 0,
  answers: [],
  showScore: false,
  hasStarted: false, // guards /questions against direct visits and refreshes
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    quizStart(state) {
      state.hasStarted = true;
    },

    answer(state, action) {
      const { isCorrect, idx } = action.payload;
      state.answers[state.questionIdx] = { isCorrect, idx };

      if (state.questionIdx + 1 >= QUIZ_DATA.length) {
        state.showScore = true;
      } else {
        state.questionIdx += 1;
      }
    },

    goBack(state) {
      state.questionIdx = Math.max(0, state.questionIdx - 1);
    },

    restart() {
      return initialState;
    },
  },
});

export const { quizStart, answer, goBack, restart } = quizSlice.actions;

export default quizSlice.reducer;
