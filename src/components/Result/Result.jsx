import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getScore, getMessageBasedOnScore, getReview } from "./Result.utils";
import { COPY } from './Result.constants';
import { Wrapper } from '../Wrapper';
import { Sigil } from '../Sigil';
import { getQuestions } from '../Quiz/Quiz.constants';

import { quizStart, restart } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';
import { recordScore } from '../../scores';

const Result = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);
  const showScore = useSelector((state) => state.quiz.showScore);
  const level = useSelector((state) => state.quiz.level);
  const navigate = useNavigate();

  const [showReview, setShowReview] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const recorded = useRef(false);

  const quiz = getQuestions(level);
  const score = getScore(answers);
  const totalQuestions = quiz.length;
  const review = getReview(answers, quiz);

  useEffect(() => {
    if (!showScore) {
      navigate(ROUTES.home, { replace: true });
    }
  }, [showScore, navigate]);

  useEffect(() => {
    if (!showScore || recorded.current) return;
    recorded.current = true;
    recordScore(level, score, totalQuestions).then(setOutcome);
  }, [showScore, level, score, totalQuestions]);

  const restartClickHandler = () => {
    dispatch(restart());
    dispatch(quizStart());
    navigate(ROUTES.questions);
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

      {outcome?.beaten && <span className="best-flag">{COPY.newBest}</span>}
      {outcome && !outcome.beaten && (
        <span className="best-note">
          {COPY.bestSoFar} {outcome.best}/{totalQuestions}
        </span>
      )}
      <p className="intro-description center">
        {getMessageBasedOnScore(score, totalQuestions)}
      </p>

      <div className="result-actions">
        <button onClick={restartClickHandler} className="default-btn">
          {COPY.restart}
        </button>

        <button
          onClick={() => setShowReview((open) => !open)}
          className="default-btn outlined-button review-toggle"
          aria-expanded={showReview}
          aria-controls="review-list"
        >
          {showReview ? COPY.reviewHide : COPY.review}
          <svg
            className="review-chevron"
            viewBox="0 0 12 8"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M1 1.75 6 6.25 11 1.75"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {showReview && (
        <ol className="review" id="review-list">
          {review.map((row) => (
            <li className="review-row" data-correct={row.isCorrect} key={row.number}>
              <span className="review-num">{String(row.number).padStart(2, '0')}</span>
              <p className="review-q">{row.questionText}</p>

              {/* Labelled rather than only coloured, so the outcome still
                  reads without relying on telling green from red. */}
              <p className="review-a">
                <span className="review-label">
                  {row.answered ? COPY.chose : ''}
                </span>
                <span className={`review-given${row.answered ? '' : ' is-skipped'}`}>
                  {row.answered ? row.chosen : COPY.skipped}
                </span>
              </p>

              {!row.isCorrect && row.correct && (
                <p className="review-a">
                  <span className="review-label">{COPY.answer}</span>
                  <span className="review-right">{row.correct}</span>
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </Wrapper>
  );
};

export default Result;
