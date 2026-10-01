import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../Wrapper';
import { Book } from '../Book';
import { useScores } from '../../hooks/useScores';
import { quizStart, setLevel } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';
import { COPY, LEVELS } from '../ChooseLevel/ChooseLevel.constants';

const LevelPicker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scores = useScores();

  const onSelectLevel = (level) => () => {
    dispatch(setLevel(level));
    dispatch(quizStart());
    navigate(ROUTES.questions);
  };

  return (
    <Wrapper>
      <span className="page-eyebrow">{COPY.eyebrow}</span>
      <h1 className="intro-title">{COPY.title}</h1>

      <div className="blocks">
        {LEVELS.map(({ id, name, place, note, spine }, i) => (
          <button key={id} onClick={onSelectLevel(id)} className="block">
            <Book spine={spine} />
            <span className="block-level">
              {COPY.chapterEyebrow} {i + 1} &mdash; {name}
            </span>
            <span className="block-name">{place}</span>
            <span className="block-note">{note}</span>
            {scores?.[id] && (
              <span className="block-best">
                {COPY.best} {scores[id].best}/{scores[id].total}
              </span>
            )}
          </button>
        ))}
      </div>
    </Wrapper>
  );
};

export default LevelPicker;
