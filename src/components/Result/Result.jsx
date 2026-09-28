import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getScore, getMessageBasedOnScore } from "./Result.utils";
import { COPY } from './Result.constants';
import { Wrapper } from '../Wrapper';
import { QUIZ_DATA } from '../Quiz/Quiz.constants';

import { restart } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';

const Result = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);
  const showScore = useSelector((state) => state.quiz.showScore);
  const navigate = useNavigate();

  const score = getScore(answers);
  const totalQuestions = QUIZ_DATA.length;

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
      <h3 className="question">
        {COPY.title}
      </h3>
      <div className="result-wrapper">
        <div className="result">
          {COPY.score}
        </div>
        <p className="points">
          {score} / {totalQuestions}
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
