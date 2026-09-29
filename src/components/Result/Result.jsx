import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getScore, getMessageBasedOnScore } from "./Result.utils";
import { COPY } from './Result.constants';
import { Wrapper } from '../Wrapper';
import { Sigil } from '../Sigil';
import { getQuestions } from '../Quiz/Quiz.constants';

import { restart } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';

const Result = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);
  const showScore = useSelector((state) => state.quiz.showScore);
  const level = useSelector((state) => state.quiz.level);
  const navigate = useNavigate();

  const score = getScore(answers);
  const totalQuestions = getQuestions(level).length;

  useEffect(() => {
    if (!showScore) {
      navigate(ROUTES.home, { replace: true });
    }
  }, [showScore, navigate]);

  const restartClickHandler = () => {
    dispatch(restart());
    navigate(ROUTES.home);
  };

  return (
    <Wrapper>
      <span className="eyebrow">{COPY.title}</span>
      <div className="result-wrapper">
        <Sigil className="sigil-frame" />
        <span className="result">{COPY.score}</span>
        <p className="points">
          {score}<span className="points-total"> / {totalQuestions}</span>
        </p>
      </div>
      <p className="intro-description center">
        {getMessageBasedOnScore(score, totalQuestions)}
      </p>
      <button onClick={restartClickHandler} className="default-btn">
        {COPY.restart}
      </button>
    </Wrapper>
  );
};

export default Result;
