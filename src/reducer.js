import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { QUIZ_DATA } from "./components/Quiz/Quiz.constants";

const initialState = {
  currentQuestion: 0,
  score: 0,
  showScore: false,
  showIntro: true,
  showContent: false,
  totalQuestions: QUIZ_DATA.length,
}

const handleAnswer = (state, action) => {
  const { isCorrect } = action.payload;
  const nextQuestion = state.currentQuestion + 1;

  if (nextQuestion < QUIZ_DATA.length) {
    return {
      ...state,
      currentQuestion: nextQuestion,
      score: isCorrect ? state.score + 1 : state.score,
    };
  } else {
    return {
      ...state,
      score: isCorrect ? state.score + 1 : state.score,
      showContent: false,
      showScore: true,
    };
  }
};

const handleRestart = () => ({ ...initialState });

const handleQuizStart = (state) => ({
  ...state,
  showIntro: false,
  showContent: true,
});

const handleGoBack = (state) => ({
  ...state,
  currentQuestion: state.currentQuestion - 1,
});

export default handleActions({
  [actions.answer]: handleAnswer,
  [actions.restart]: handleRestart,
  [actions.quizStart]: handleQuizStart,
  [actions.goBack]: handleGoBack,
}, initialState);