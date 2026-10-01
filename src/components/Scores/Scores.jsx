import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Wrapper } from '../Wrapper';
import { useScores } from '../../hooks/useScores';
import { quizStart, setLevel } from '../../quizSlice';
import { ROUTES } from '../../routes/Routes.constants';
import { LEVELS, COPY as LEVEL_COPY } from '../ChooseLevel/ChooseLevel.constants';
import { COPY } from './Scores.constants';

const Scores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scores = useScores();

  const onPlay = (level) => () => {
    dispatch(setLevel(level));
    dispatch(quizStart());
    navigate(ROUTES.questions);
  };

  if (!scores) return <Wrapper><span className="page-eyebrow">{COPY.eyebrow}</span></Wrapper>;

  const played = LEVELS.filter(({ id }) => scores[id]).length;

  return (
    <Wrapper>
      <span className="page-eyebrow">{COPY.eyebrow}</span>
      <h1 className="intro-title">{COPY.title}</h1>

      {played === 0 && <p className="intro-description center">{COPY.empty}</p>}

      <div className="records">
        {LEVELS.map(({ id, name, place }, i) => {
          const record = scores[id];
          const last = record?.last ?? record?.best;
          const history = record?.history ?? [];

          return (
            <article className="record-row" key={id}>
              <div className="record-row-head">
                <span className="record-row-level">
                  {LEVEL_COPY.chapterEyebrow} {i + 1} &mdash; {name}
                </span>
                <h2 className="record-row-place">{place}</h2>
              </div>

              {record ? (
                <>
                  <dl className="figures">
                    <div className="figure">
                      <dt>{COPY.best}</dt>
                      <dd>{record.best}<span>/{record.total}</span></dd>
                    </div>
                    <div className="figure">
                      <dt>{COPY.last}</dt>
                      <dd>{last}<span>/{record.total}</span></dd>
                    </div>
                    <div className="figure">
                      <dt>{COPY.attempts}</dt>
                      <dd>{record.runs}</dd>
                    </div>
                  </dl>

                  {history.length > 1 && (
                    <div className="runs" aria-label={COPY.recent}>
                      {history.map((value, run) => (
                        <span
                          key={run}
                          className="run"
                          data-best={value === record.best}
                          style={{ '--run-height': `${Math.max((value / record.total) * 100, 4)}%` }}
                          title={`${value}/${record.total}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="record-untried">{COPY.untried}</p>
              )}

              <button onClick={onPlay(id)} className="default-btn outlined-button">
                {record ? COPY.again : COPY.start}
              </button>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Scores;
