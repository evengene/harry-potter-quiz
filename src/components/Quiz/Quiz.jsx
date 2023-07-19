import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { COPY } from './Quiz.constants';
import { Wrapper } from '../Wrapper';
import { quizStart } from '../../actions';
import { ROUTES } from '../../routes/Routes.constants';


const Quiz = () => {

  const navigate = useNavigate();

  const onStartHandler = () => {
    quizStart();
    navigate(ROUTES.questions)
  }

  return (
    <Wrapper>
      <div className="intro">
        <h1 className="intro-title">{COPY.title}</h1>
        <p className="intro-description">{COPY.description}</p>
        <p className="intro-note">{COPY.note}</p>
        <button onClick={onStartHandler} className="default-btn">
          {COPY.start}
        </button>
      </div>
    </Wrapper>
  )
}

const mapDispatch = dispatch => bindActionCreators({
  quizStart
}, dispatch);

export default connect(
  mapDispatch
)(Quiz)
