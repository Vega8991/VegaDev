import { useState, useMemo } from 'react';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import { useT } from '../i18n/LangContext';
import { PROJECTS } from '../data/projects';

function projectName(id, lang) {
  if (id === 'g-rank') return 'G-Rank';
  if (id === 'kings') return 'Kings of Gambling';
  if (id === 'portfolio') return lang === 'es' ? 'Este Portfolio' : 'This Portfolio';
  return id;
}

export default function WorkPage() {
  const { t, lang } = useT();
  const w = t.work;
  const [filter, setFilter] = useState(t.filterAll);

  const allTech = useMemo(() => {
    const set = new Set();
    PROJECTS.forEach((p) => p.stack.forEach((s) => set.add(s)));
    return [t.filterAll, ...Array.from(set)];
  }, [t.filterAll]);

  const filtered = filter === t.filterAll ? PROJECTS : PROJECTS.filter((p) => p.stack.includes(filter));

  return (
    <div className="page">
      <section className="hero-section shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Reveal>
          <span className="label" style={{ color: 'var(--muted)' }}>{w.kicker}</span>
          <h1 className="hero" style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}>
            {w.titleA}<br />
            <span className="hero-accent-block">{w.titleAccent}</span>{w.titleB}
          </h1>
        </Reveal>
        <Reveal>
          <p className="lead" style={{ marginTop: 24, maxWidth: '48ch' }}>{w.lead}</p>
        </Reveal>
      </section>

      <Marquee items={w.marquee} />

      <section className="section shell">
        <Reveal>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28, alignItems: 'center' }}>
            <span className="label" style={{ marginRight: 8 }}>{w.filterLabel}</span>
            {allTech.map((tech) => (
              <button
                key={tech}
                className="skill-tag"
                style={{
                  background: filter === tech ? 'var(--accent)' : 'var(--bg)',
                  color: filter === tech ? 'var(--accent-ink)' : 'var(--fg)',
                  cursor: 'pointer',
                }}
                onClick={() => setFilter(tech)}
              >
                {filter === tech && <span className="bullet" style={{ background: 'var(--accent-ink)' }}></span>}
                {tech}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="projects-grid">
            {filtered.map((p, i) => {
              const tp = t.projects[p.id] || {};
              return (
                <a key={p.id} href={p.github} target="_blank" rel="noreferrer" className="project-row">
                  <div className="project-num">[{String(i + 1).padStart(2, '0')}]</div>
                  <div>
                    <div className="project-name">{projectName(p.id, lang)}</div>
                    <div className="label" style={{ marginTop: 6, color: 'inherit', opacity: 0.7 }}>{p.year} · {tp.role}</div>
                  </div>
                  <div className="project-desc">{tp.tagline}<br /><span style={{ opacity: 0.7 }}>{tp.desc}</span></div>
                  <div className="project-stack">{p.stack.join(' / ')}</div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="project-arrow">→</span>
                  </div>
                </a>
              );
            })}
          </div>
        </Reveal>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, border: '3px solid var(--line)', marginTop: 24 }}>
            <div className="mono" style={{ fontSize: 14, textTransform: 'uppercase', color: 'var(--muted)' }}>
              {w.empty} "{filter}".
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
