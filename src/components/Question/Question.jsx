import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../Wrapper';
import { answer, goBack, restart } from '../../quizSlice';
import { COPY, getQuestions } from '../Quiz/Quiz.constants';
import { ROUTES } from '../../routes/Routes.constants';

const FEEDBACK_MS = 600;

const Question = () => {
  const dispatch = useDispatch();
  const questionIdx = useSelector((state) => state.quiz.questionIdx);
  const showScore = useSelector((state) => state.quiz.showScore);
  const hasStarted = useSelector((state) => state.quiz.hasStarted);
  const level = useSelector((state) => state.quiz.level);
  const quiz = getQuestions(level);
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
      return;
    }
    // Backing out of the first question ends the run rather than leaving it
    // open. Without this hasStarted stays true, so the nav goes on reporting
    // "in progress" and holding the level link shut while you are standing
    // on the level select.
    dispatch(restart());
    navigate(ROUTES.home);
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
        <div className="quiz-panel-wrap">
          <div className="quiz-panel">
            <div className="info">
              Question {index} of {total}
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressValue}%` }} />
            </div>
            <h3 className="question" key={`q-${questionIdx}`}>
              {question?.questionText}
            </h3>
            <div
              key={`a-${questionIdx}`}
              className={`answer${isShowingFeedback ? ' locked' : ''}`}
            >
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
                  <span className="answer-key">{COPY.answerKeys[idx]}</span>
                  {answerOption.text}
                </button>
              ))}
            </div>
          </div>
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
