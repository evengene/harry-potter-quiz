import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../Wrapper';
import { answer, goBack, setHover } from '../../actions';
import { COPY, QUIZ_DATA as quiz } from '../Quiz/Quiz.constants';

const Question = (props) => {

  const { onAnswer, onGoBack, currentQuestion, score, showScore, isHovered, onSetHover } = props;
  const navigate = useNavigate();
  // let { questionId } = useParams();
  const question = quiz[currentQuestion];
  const index = currentQuestion + 1;
  const total = quiz.length;


  const progressValue = (index / total) * 100;

  const handleAnswer = (answerOption) => () => {
      onAnswer(answerOption)
  }

  const onBackHandler = () => {
    if (currentQuestion > 0) {
      onGoBack()
    }
    else navigate('/');
  }

  useEffect(() => {
    if (showScore) {
      navigate('/results')
    }
  }, [showScore])

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
        <div className="answer">
          {question.answerOptions.map((answerOption, index) => (
            <button
              key={index}
              onClick={handleAnswer(answerOption)}
              className={`answer-button ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => onSetHover(true)}
              onMouseLeave={() => onSetHover(false)}
            >
              {answerOption.text}
            </button>
          ))}
        </div>


        <p>{score}</p>
        <button onClick={onBackHandler} className="default-btn outlined-button">
          {COPY.back}
        </button>
      </div>
    </Wrapper>
  );
}

const mapState = ({ currentQuestion, score, showScore,  isHovered }) => ({ currentQuestion, score, showScore, isHovered });

const mapDispatch = dispatch => bindActionCreators({
  onAnswer: answer,
  onGoBack: goBack,
  onSetHover: setHover
}, dispatch);

export default connect(
  mapState,
  mapDispatch
)(Question)
