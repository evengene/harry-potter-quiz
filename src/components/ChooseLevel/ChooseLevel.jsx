import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../Wrapper';
import Logo from '../../assets/hp-logo.svg';
import { quizStart, setLevel } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';
import { COPY, LEVELS } from './ChooseLevel.constants';

const ChooseLevel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSelectLevel = (level) => () => {
    dispatch(setLevel(level));
    dispatch(quizStart());
    navigate(ROUTES.questions);
  };

  return (
    <Wrapper>
      <span className="eyebrow">{COPY.eyebrow}</span>
      <h1 className="intro-title">{COPY.title}</h1>

      <div className="blocks">
        {LEVELS.map(({ id, name, note }) => (
          <button key={id} onClick={onSelectLevel(id)} className="block">
            <span className="book">
              <span className="book-spine" />
              <span className="book-cover">
                <img src={Logo} className="book-image" alt="" />
              </span>
              <span className="book-pages" />
            </span>
            <span className="block-name">{name}</span>
            <span className="block-note">{note}</span>
          </button>
        ))}
      </div>
    </Wrapper>
  );
};

export default ChooseLevel;
