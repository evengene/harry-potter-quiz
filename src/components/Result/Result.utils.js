import { COPY } from './Result.constants';

// Count how many answers were correct -> a NUMBER
export const getScore = (answers) =>
  answers.filter(answer => answer?.isCorrect).length;

// Pick the right message for that score -> a STRING
export const getMessageBasedOnScore = (score, totalQuestions) => {
  const percentage = (score / totalQuestions) * 100;
  if (percentage === 100) return COPY.perfect;
  if (percentage >= 80) return COPY.excellent;
  if (percentage >= 60) return COPY.good;
  if (percentage >= 40) return COPY.average;
  return COPY.average;
};

