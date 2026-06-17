import { COPY } from './Result.constants';

export const getMessageBasedOnScore = (answers, totalQuestions) => {
  debugger;
  const totalCorrectAnswers = answers.filter(answer => answer?.isCorrect).length;

  const percentage = (totalCorrectAnswers / totalQuestions) * 100;
  if (percentage === 100) {
    return COPY.perfect;
  } else if (percentage >= 80) {
    return COPY.excellent;
  } else if (percentage >= 60) {
    return COPY.good;
  } else if (percentage >= 40) {
    return COPY.average;
  } else {
    return COPY.average;
  }
}


