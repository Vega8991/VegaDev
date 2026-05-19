import { useT } from '../i18n/LangContext';
import { ROUTES } from '../data/routes';
import { owner } from '../config';

export default function Footer({ onNavigate }) {
  const { t } = useT();
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <h5>{t.footer.heading}</h5>
            <div className="footer-big">{t.footer.bigA}<br />{t.footer.bigB}</div>
            <a
              className="btn primary"
              href="#/contact"
              onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
            >
              {t.common.shootMessage} <span className="arrow">→</span>
            </a>
          </div>
          <div>
            <h5>{t.footer.sitemap}</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'Space Mono, monospace', fontSize: 14 }}>
              {ROUTES.map((r) => (
                <li key={r.id}>
                  <a
                    href={'#/' + r.id}
                    className="text-link"
                    onClick={(e) => { e.preventDefault(); onNavigate(r.id); }}
                  >
                    [{r.num}] {t.nav.links[r.id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>{t.footer.elsewhere}</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'Space Mono, monospace', fontSize: 14 }}>
              <li><a className="text-link" href={owner.github.url} target="_blank" rel="noreferrer">↗ GitHub</a></li>
              <li><a className="text-link" href={owner.linkedin.url} target="_blank" rel="noreferrer">↗ LinkedIn</a></li>
              <li><a className="text-link" href={`mailto:${owner.email}`}>↗ Email</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-baseline">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
