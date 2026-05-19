import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import { useT } from '../i18n/LangContext';
import { owner } from '../config';

export default function PathPage() {
  const { t } = useT();
  const p = t.path;
  return (
    <div className="page">
      <section className="hero-section shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Reveal>
          <span className="label" style={{ color: 'var(--muted)' }}>{p.kicker}</span>
          <h1 className="hero" style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}>
            {p.titleA}<br />
            {p.titleB}<span className="hero-accent-block">{p.titleAccent}</span>
          </h1>
        </Reveal>
        <Reveal>
          <p className="lead" style={{ marginTop: 24, maxWidth: '48ch' }}>{p.lead}</p>
        </Reveal>
      </section>

      <Marquee items={p.marquee} />

      <section className="section shell">
        <div className="section-head">
          <div className="section-num">{p.sectionNum}</div>
          <div>
            <h2 className="section-title">{p.sectionTitle}</h2>
            <p className="section-sub">{p.sectionSub}</p>
          </div>
        </div>

        <Reveal>
          <div className="timeline">
            {t.timeline.map((it, i) => (
              <div key={i} className="tl-item">
                <span className="tl-date">{it.date}</span>
                <div className="tl-body">
                  <h4>{it.title}</h4>
                  <div className="tl-place">{it.place}</div>
                  <p>{it.desc}</p>
                </div>
                <span className="tl-tag">{it.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 40 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <span className="sticker">{p.cvComing}</span>
              <a className="btn primary" href={`mailto:${owner.email}`}>{t.common.requestCv} <span className="arrow">→</span></a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
