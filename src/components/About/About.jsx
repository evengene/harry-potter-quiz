import { Wrapper } from '../Wrapper';
import { Sigil } from '../Sigil';
import Logo from '../../assets/hp-logo.svg';
import { QUIZ_DATA } from '../Quiz/Quiz.constants';
import { LEVELS } from '../ChooseLevel/ChooseLevel.constants';
import { COPY } from './About.constants';

const About = () => {
  const attrs = COPY.attrs.filter(({ value }) => value);
  const stats = [
    { label: 'Questions', value: Object.values(QUIZ_DATA).reduce((n, set) => n + set.length, 0) },
    { label: 'Trials', value: LEVELS.length },
  ];

  return (
    <Wrapper>
      <span className="page-eyebrow">{COPY.eyebrow}</span>
      <h1 className="intro-title">{COPY.title}</h1>

      <div className="sheet">
        <div className="sheet-top">
          <div className="sheet-id">
            <span className="crest">
              <svg
                className="crest-frame"
                viewBox="0 0 64 72"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <polygon
                  points="32,1 63,18.5 63,53.5 32,71 1,53.5 1,18.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <img src={Logo} alt="" className="crest-mark" />
            </span>
            <div className="sheet-id-text">
              <span className="sheet-rank">{COPY.rank}</span>
              <span className="sheet-name">{COPY.name}</span>
              {COPY.role && <span className="sheet-role">{COPY.role}</span>}
            </div>
          </div>

          <dl className="sheet-stats">
            {stats.map(({ label, value }) => (
              <div className="stat" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {attrs.length > 0 && (
          <dl className="sheet-attrs">
            {attrs.map(({ label, value }) => (
              <div className="attr" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        <span className="sheet-divider" />

        <div className="sheet-bio">
          <Sigil className="bio-sigil" />
          <p>{COPY.bio}</p>
        </div>

        <div className="about-links">
          {COPY.links.map(({ label, href }) => (
            <a
              key={href}
              className="default-btn outlined-button"
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
