import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { QUIZ_DATA } from "./components/Quiz/Quiz.constants";

const initialState = {
  questionIdx: 0,
  answers: [],
  showScore: false,
  showIntro: true,
  showContent: false,
}

const handleAnswer = (state, action) => {
  const { isCorrect, idx } = action.payload;
  const { questionIdx, showScore } = state;

  const answers = [...state.answers];
  answers[questionIdx] = { isCorrect, idx }; // write answer into this slot

  const nextQuestion = questionIdx + 1;
  const isLast = nextQuestion >= QUIZ_DATA.length;

    return {
      ...state,
      answers, // updated list
      questionIdx: isLast ? questionIdx : nextQuestion, // only update if not last
      showScore: isLast ? true : showScore,
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
  questionIdx: state.questionIdx - 1,
});

export default handleActions({
  [actions.answer]: handleAnswer,
  [actions.restart]: handleRestart,
  [actions.quizStart]: handleQuizStart,
  [actions.goBack]: handleGoBack,
}, initialState);
