import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import Slider from '../components/Slider';
import { useT } from '../i18n/LangContext';
import { PROJECTS } from '../data/projects';

export default function HomePage({ onNavigate }) {
  const { t } = useT();
  const h = t.home;
  return (
    <div className="page">
      <section className="hero-section shell">
        <Reveal>
          <span className="hero-availability">
            <span className="pulse"></span>
            {h.availability}
          </span>
        </Reveal>
        <Reveal>
          <h1 className="hero">
            {h.titleA}<br />
            {h.titleB} <span className="hero-accent-block">{h.titleAccent}</span><br />
            <span className="hero-rotate">{h.titleC}</span><br />
            {h.titleD}
          </h1>
        </Reveal>
        <Reveal>
          <div className="hero-meta">
            <div className="meta-cell"><span className="label">{h.meta.who}</span><span className="val">{h.metaVals.who}</span></div>
            <div className="meta-cell"><span className="label">{h.meta.focus}</span><span className="val">{h.metaVals.focus}</span></div>
            <div className="meta-cell"><span className="label">{h.meta.stack}</span><span className="val">{h.metaVals.stack}</span></div>
            <div className="meta-cell"><span className="label">{h.meta.status}</span><span className="val">{h.metaVals.status}</span></div>
          </div>
        </Reveal>
        <Reveal>
          <div className="scroll-hint">
            <span className="line"></span>
            <span>{h.scrollHint}</span>
          </div>
        </Reveal>
      </section>

      <Marquee items={h.marquee} />

      <section className="section shell" id="about">
        <div className="section-head">
          <div className="section-num">{h.aboutNum}</div>
          <div>
            <h2 className="section-title">{h.aboutTitleA}<br />{h.aboutTitleB}</h2>
            <p className="section-sub">{h.aboutSub}</p>
          </div>
        </div>
        <Reveal>
          <div className="about-grid">
            <div className="about-portrait">
              <span className="corner tl">{h.portraitTl}</span>
              <span className="glyph">V8</span>
              <span className="corner br">{h.portraitBr}</span>
              <div className="badge">
                <span className="sticker round">
                  <span>{h.stickerA}</span>
                  <span>{h.stickerB}</span>
                  <span>{h.stickerC}</span>
                </span>
              </div>
            </div>
            <div className="about-text">
              <p className="lead">
                {h.lead[0]}<strong>{h.lead[1]}</strong>{h.lead[2]}
              </p>
              <p>
                {h.bodyA}<span className="mono">{h.bodyAStack}</span>{h.bodyAEnd}
              </p>
              <p>{h.bodyB}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                <a className="btn primary" href="#/work" onClick={(e) => { e.preventDefault(); onNavigate('work'); }}>
                  {t.common.seeProjects} <span className="arrow">→</span>
                </a>
                <a className="btn ghost" href="#/contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>
                  {t.common.getInTouch} <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="info-strip">
            {h.info.map((it, i) => (
              <div key={i}>
                <div className="big">{it.big}</div>
                <div className="tiny">{it.tiny}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section shell">
        <div className="section-head">
          <div className="section-num">{h.featNum}</div>
          <div>
            <h2 className="section-title">{h.featTitleA}<br />{h.featTitleB}</h2>
            <p className="section-sub">{h.featSub}</p>
          </div>
        </div>
        <Reveal>
          <Slider projects={PROJECTS} />
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <a className="btn" href="#/work" onClick={(e) => { e.preventDefault(); onNavigate('work'); }}>
            {t.common.allProjects} <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
