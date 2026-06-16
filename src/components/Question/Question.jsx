import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../Wrapper';
import { answer, goBack } from '../../actions';
import { COPY, QUIZ_DATA as quiz } from '../Quiz/Quiz.constants';

const Question = (props) => {
  const { onAnswer, onGoBack, currentQuestion, showScore } = props;
  const navigate = useNavigate();
  const question = quiz[currentQuestion];
  const index = currentQuestion + 1;
  const total = quiz.length;
  const progressValue = (index / total) * 100;

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedbackCorrect, setFeedbackCorrect] = useState(null);

  const handleAnswer = (answerOption, idx) => () => {
    if (selectedIndex !== null) return;
    setSelectedIndex(idx);
    setFeedbackCorrect(answerOption.isCorrect);
    setTimeout(() => {
      onAnswer(answerOption);
      setSelectedIndex(null);
      setFeedbackCorrect(null);
    }, 600);
  };

  const onBackHandler = () => {
    if (currentQuestion > 0) {
      onGoBack();
    } else navigate('/');
  };

  useEffect(() => {
    if (showScore) {
      navigate('/results');
    }
  }, [showScore]);

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
            {question.questionText}
          </h3>
        </div>
        <div className={`answer${selectedIndex !== null ? ' locked' : ''}`}>
          {question.answerOptions.map((answerOption, idx) => (
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

        <button onClick={onBackHandler} className="default-btn outlined-button">
          {COPY.back}
        </button>
      </div>
    </Wrapper>
  );
};

const mapState = ({ currentQuestion, showScore }) => ({ currentQuestion, showScore });

const mapDispatch = dispatch => bindActionCreators({
  onAnswer: answer,
  onGoBack: goBack,
}, dispatch);

export default connect(
  mapState,
  mapDispatch
)(Question);
