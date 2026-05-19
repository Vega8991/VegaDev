import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import { useT } from '../i18n/LangContext';

export default function StackPage() {
  const { t } = useT();
  const s = t.stack;
  return (
    <div className="page">
      <section className="hero-section shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Reveal>
          <span className="label" style={{ color: 'var(--muted)' }}>{s.kicker}</span>
          <h1 className="hero" style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}>
            {s.titleA}<br />
            {s.titleB}<span className="hero-accent-block">{s.titleAccent}</span>
          </h1>
        </Reveal>
        <Reveal>
          <p className="lead" style={{ marginTop: 24, maxWidth: '48ch' }}>{s.lead}</p>
        </Reveal>
      </section>

      <Marquee items={s.marquee} />

      <section className="section shell">
        <div className="section-head">
          <div className="section-num">{s.sectionNum}</div>
          <div>
            <h2 className="section-title">{s.sectionTitleA}<br />{s.sectionTitleB}</h2>
            <p className="section-sub">{s.sectionSub}</p>
          </div>
        </div>

        <Reveal>
          <div className="skills-grid">
            <div className="skill-col">
              <h4>{s.colCompetencies}</h4>
              <div className="skill-tag-list">
                {t.skills.competencies.map((k) => (
                  <span key={k} className="skill-tag"><span className="bullet"></span>{k}</span>
                ))}
              </div>
            </div>
            <div className="skill-col">
              <h4>{s.colTech}</h4>
              <div className="skill-tag-list">
                {t.skills.tech.map((k) => (
                  <span key={k} className="skill-tag"><span className="bullet"></span>{k}</span>
                ))}
              </div>
            </div>
            <div className="skill-col">
              <h4>{s.colTools}</h4>
              <div className="skill-tag-list">
                {t.skills.tools.map((k) => (
                  <span key={k} className="skill-tag"><span className="bullet"></span>{k}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="info-strip" style={{ marginTop: 40 }}>
            <div><div className="big">A</div><div className="tiny">// ATOMIC</div></div>
            <div><div className="big">B</div><div className="tiny">// BUILDS UI</div></div>
            <div><div className="big">C</div><div className="tiny">// COMPONENTS</div></div>
            <div><div className="big">D</div><div className="tiny">// DELIVERED</div></div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 48, border: '3px solid var(--line)', padding: 28, background: 'var(--paper)' }}>
            <h4 style={{ fontFamily: 'Space Mono, monospace', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 12 }}>{s.learning}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'baseline' }}>
              <span style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em' }}>TypeScript</span>
              <span style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em' }}>·</span>
              <span style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em' }}>Testing (Jest)</span>
              <span style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em' }}>·</span>
              <span style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--accent)' }}>Next.js</span>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
