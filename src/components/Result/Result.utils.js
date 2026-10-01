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
  return COPY.low;
};

/**
 * Pair every question with what was given for it -> an ARRAY of rows.
 *
 * Driven by the questions rather than the answers, so a run that was somehow
 * left short still lists all ten rather than silently stopping early.
 */
export const getReview = (answers, questions) =>
  questions.map((question, i) => {
    const given = answers[i];
    const options = question.answerOptions ?? [];
    const correct = options.find((option) => option.isCorrect);

    return {
      number: i + 1,
      questionText: question.questionText,
      answered: Boolean(given),
      isCorrect: Boolean(given?.isCorrect),
      // Guarded: an index that no longer matches the options would otherwise
      // throw here rather than at the point the answer was recorded.
      chosen: given ? (options[given.idx]?.text ?? null) : null,
      correct: correct?.text ?? null,
    };
  });
