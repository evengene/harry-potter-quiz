import { useEffect } from "react";
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
  const { answers, showScore, onRestart } = props;
  const navigate = useNavigate();

  const score = getScore(answers);
  const totalQuestions = QUIZ_DATA.length;

  useEffect(() => {
    if (!showScore) {
      navigate(ROUTES.home, { replace: true });
    }
  }, [showScore, navigate]);

  const restartClickHandler = () => {
    onRestart();
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

const mapState = ({ answers, showScore }) => ({
  answers,
  showScore,
});

const mapDispatch = dispatch => bindActionCreators({
  onRestart: restart,
}, dispatch);


export default connect(
  mapState,
  mapDispatch
)(Result)
