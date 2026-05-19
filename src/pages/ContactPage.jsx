import { useState } from 'react';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import { useT } from '../i18n/LangContext';
import { owner } from '../config';

export default function ContactPage() {
  const { t } = useT();
  const c = t.contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = c.errors.nameMissing;
    if (!form.email.trim()) errs.email = c.errors.emailMissing;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = c.errors.emailBroken;
    if (!form.message.trim()) errs.message = c.errors.messageMissing;
    else if (form.message.trim().length < 10) errs.message = c.errors.messageShort;
    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 6000);
    }
  };

  return (
    <div className="page">
      <section className="hero-section shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Reveal>
          <span className="label" style={{ color: 'var(--muted)' }}>{c.kicker}</span>
          <h1 className="hero" style={{ fontSize: 'clamp(60px, 12vw, 180px)' }}>
            {c.titleA}{c.titleAccent && <><br /><span className="hero-accent-block">{c.titleAccent}</span></>}
          </h1>
        </Reveal>
        <Reveal>
          <p className="lead" style={{ marginTop: 24, maxWidth: '48ch' }}>{c.lead}</p>
        </Reveal>
      </section>

      <Marquee items={c.marquee} />

      <section className="section shell">
        <div className="section-head">
          <div className="section-num">{c.sectionNum}</div>
          <div>
            <h2 className="section-title">{c.sectionTitle}</h2>
            <p className="section-sub">{c.sectionSub}</p>
          </div>
        </div>

        <Reveal>
          <div className="contact-grid">
            <div className="contact-info">
              <div>
                <h4 style={{ fontFamily: 'Space Mono, monospace', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 12 }}>{c.channels}</h4>
                <a href={`mailto:${owner.email}`} className="contact-row">
                  <span className="key">{c.email}</span>
                  <span className="val">{owner.email}</span>
                  <span className="arrow">→</span>
                </a>
                <a href={owner.github.url} target="_blank" rel="noreferrer" className="contact-row">
                  <span className="key">{c.githubKey}</span>
                  <span className="val">{owner.github.handle}</span>
                  <span className="arrow">→</span>
                </a>
                <a href={owner.linkedin.url} target="_blank" rel="noreferrer" className="contact-row">
                  <span className="key">{c.linkedinKey}</span>
                  <span className="val">{owner.linkedin.handle}</span>
                  <span className="arrow">→</span>
                </a>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="sticker">{c.sticker}</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: 'var(--muted)' }}>
                  {c.basedIn}
                </span>
              </div>
            </div>

            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <h4 style={{ fontFamily: 'Space Mono, monospace', textTransform: 'uppercase', fontSize: 13, letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: 4 }}>{c.sendMessage}</h4>

              <div className="form-row">
                <label htmlFor="name">{c.formName}</label>
                <input id="name" type="text" value={form.name} onChange={update('name')}
                  className={errors.name ? 'error' : ''} placeholder={c.placeholderName} autoComplete="name" />
                {errors.name && <span className="form-error">⚠ {errors.name}</span>}
              </div>

              <div className="form-row">
                <label htmlFor="email">{c.formEmail}</label>
                <input id="email" type="email" value={form.email} onChange={update('email')}
                  className={errors.email ? 'error' : ''} placeholder={c.placeholderEmail} autoComplete="email" />
                {errors.email && <span className="form-error">⚠ {errors.email}</span>}
              </div>

              <div className="form-row">
                <label htmlFor="message">{c.formMessage}</label>
                <textarea id="message" rows="5" value={form.message} onChange={update('message')}
                  className={errors.message ? 'error' : ''} placeholder={c.placeholderMessage}></textarea>
                {errors.message && <span className="form-error">⚠ {errors.message}</span>}
              </div>

              {sent && <div className="form-success">{c.success}</div>}

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
                <button type="submit" className="btn primary">
                  {t.common.transmit} <span className="arrow">→</span>
                </button>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--muted)' }}>
                  {c.noBackend}
                </span>
              </div>
            </form>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
