import { createAction } from 'redux-actions';

export const answer = createAction('ANSWER_OPTION_CLICK');

export const restart = createAction('RESTART');

export const quizStart = createAction('QUIZ_START');
export const goBack = createAction('GO_BACK');

export const setHover = createAction('SET_HOVER');