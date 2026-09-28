import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { COPY } from './Quiz.constants';
import { Wrapper } from '../Wrapper';
import { quizStart } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onStartHandler = () => {
    dispatch(quizStart());
    navigate(ROUTES.questions);
  };

  return (
    <Wrapper>
      <div className="intro">
        <span className="eyebrow">{COPY.eyebrow}</span>
        <h1 className="intro-title">{COPY.title}</h1>
        <p className="intro-description">{COPY.description}</p>
        <button onClick={onStartHandler} className="default-btn">
          {COPY.start}
        </button>
        <p className="intro-note">{COPY.note}</p>
      </div>
    </Wrapper>
  );
};

export default Quiz;
