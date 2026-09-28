import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../Wrapper';
import { answer, goBack } from '../../quizSlice';
import { COPY, QUIZ_DATA as quiz } from '../Quiz/Quiz.constants';
import { ROUTES } from '../../routes/Routes.constants';

const FEEDBACK_MS = 600;

const Question = () => {
  const dispatch = useDispatch();
  const questionIdx = useSelector((state) => state.quiz.questionIdx);
  const showScore = useSelector((state) => state.quiz.showScore);
  const hasStarted = useSelector((state) => state.quiz.hasStarted);
  const navigate = useNavigate();
  const question = quiz[questionIdx];
  const index = questionIdx + 1;
  const total = quiz.length;
  const progressValue = (index / total) * 100;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedbackCorrect, setFeedbackCorrect] = useState(null);
  const feedbackTimer = useRef(null);

  const isShowingFeedback = selectedIndex !== null;

  useEffect(() => () => clearTimeout(feedbackTimer.current), []);

  const handleAnswer = (answerOption, idx) => () => {
    if (isShowingFeedback) return;
    setSelectedIndex(idx);
    setFeedbackCorrect(answerOption.isCorrect);
    feedbackTimer.current = setTimeout(() => {
      dispatch(answer({ isCorrect: answerOption.isCorrect, idx }));
      setSelectedIndex(null);
      setFeedbackCorrect(null);
    }, FEEDBACK_MS);
  };

  const onBackHandler = () => {
    if (questionIdx > 0) {
      dispatch(goBack());
    } else navigate(ROUTES.home);
  };

  useEffect(() => {
    if (showScore) {
      navigate(ROUTES.results, { replace: true });
    } else if (!hasStarted) {
      navigate(ROUTES.home, { replace: true });
    }
  }, [showScore, hasStarted, navigate]);

  return (
    <Wrapper>
      <div className="wrapper">
        <div className="question-wrapper">
          <div className="info">
            Question {index} of {total}
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressValue}%` }} />
          </div>
          <h3 className="question">
            {question?.questionText}
          </h3>
        </div>
        <div className={`answer${isShowingFeedback ? ' locked' : ''}`}>
          {question?.answerOptions.map((answerOption, idx) => (
            <button
              key={idx}
              onClick={handleAnswer(answerOption, idx)}
              className={`answer-button${
                selectedIndex === idx
                  ? feedbackCorrect ? ' correct' : ' incorrect'
                  : ''
              }`}
            >
              {answerOption.text}
            </button>
          ))}
        </div>

        <button
          onClick={onBackHandler}
          disabled={isShowingFeedback}
          className="default-btn outlined-button"
        >
          {COPY.back}
        </button>
      </div>
    </Wrapper>
  );
};

export default Question;
