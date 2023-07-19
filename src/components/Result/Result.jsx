import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';

import { getMessageBasedOnScore } from "./Result.utils";
import { COPY } from './Result.constants';
import { Wrapper } from '../Wrapper';

import { restart } from '../../actions';
import { ROUTES } from '../../routes/Routes.constants';


const Result = (props) => {

  const {score, totalQuestions, restart } = props;
  const navigate = useNavigate();

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

const mapState = ({ score, totalQuestions }) => ({
  score,
  totalQuestions,
});

const mapDispatch = dispatch => bindActionCreators({
  restart,
}, dispatch);


export default connect(
  mapState,
  mapDispatch
)(Result)
