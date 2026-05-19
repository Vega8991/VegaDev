import { useState, useEffect, useCallback } from 'react';
import { useT } from '../i18n/LangContext';

export default function Slider({ projects }) {
  const { t, lang } = useT();
  const [idx, setIdx] = useState(0);
  const featured = projects.filter((p) => p.featured);
  const next = useCallback(() => setIdx((i) => (i + 1) % featured.length), [featured.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + featured.length) % featured.length), [featured.length]);

  useEffect(() => {
    const tt = setInterval(next, 7000);
    return () => clearInterval(tt);
  }, [next]);

  return (
    <div>
      <div className="slider-controls">
        <div className="slider-dots">
          {featured.map((_, i) => (
            <button
              key={i}
              className={'slider-dot ' + (i === idx ? 'active' : '')}
              onClick={() => setIdx(i)}
              aria-label={'Slide ' + (i + 1)}
            ></button>
          ))}
        </div>
        <div className="slider-arrows">
          <button className="slider-arrow" onClick={prev} aria-label="←">←</button>
          <button className="slider-arrow" onClick={next} aria-label="→">→</button>
        </div>
      </div>
      <div className="slider">
        <div className="slider-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {featured.map((p) => {
            const tp = t.projects[p.id] || {};
            const name =
              p.id === 'g-rank' ? 'G-Rank' :
              p.id === 'kings' ? 'Kings of Gambling' :
              lang === 'es' ? 'Este Portfolio' : 'This Portfolio';
            return (
              <div key={p.id} className="slide">
                <div className="slide-media">
                  <span className="placeholder-mark">[{p.num}] {lang === 'es' ? 'IMAGEN' : 'PROJECT SHOT'}</span>
                  <span className="glyph">{p.glyph}</span>
                  <span className="placeholder-mark" style={{ top: 'auto', left: 'auto', bottom: 20, right: 20 }}>{p.year}</span>
                </div>
                <div className="slide-body">
                  <div>
                    <span className="slide-tag">{t.common.featured} · {tp.role}</span>
                    <h3 className="slide-title">{name}</h3>
                    <p className="slide-desc">{tp.desc}</p>
                  </div>
                  <div>
                    <div className="slide-stack">{p.stack.join(' · ')}</div>
                    <div className="slide-actions">
                      <a className="btn primary" href={p.github} target="_blank" rel="noreferrer">
                        {t.common.github} <span className="arrow">→</span>
                      </a>
                      <a className="btn ghost" href={p.demo} target="_blank" rel="noreferrer">
                        {t.common.liveDemo} <span className="arrow">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
