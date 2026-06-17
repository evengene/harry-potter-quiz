import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';

import { getScore, getMessageBasedOnScore } from "./Result.utils";
import { COPY } from './Result.constants';
import { Wrapper } from '../Wrapper';
import { QUIZ_DATA } from '../Quiz/Quiz.constants';

import { restart } from '../../actions';
import { ROUTES } from '../../routes/Routes.constants';


const Result = (props) => {
  const { answers, restart } = props;
  const navigate = useNavigate();

  const score = getScore(answers);
  const totalQuestions = QUIZ_DATA.length;

  const restartClickHandler = () => {
    restart();
    navigate(ROUTES.home);
  }

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
  )
};

const mapState = ({ answers }) => ({
  answers,
});

const mapDispatch = dispatch => bindActionCreators({
  restart,
}, dispatch);


export default connect(
  mapState,
  mapDispatch
)(Result)
