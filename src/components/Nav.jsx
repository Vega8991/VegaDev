import { useState } from 'react';
import { useT } from '../i18n/LangContext';
import { ROUTES } from '../data/routes';

export default function Nav({ current, onNavigate }) {
  const [open, setOpen] = useState(false);
  const { t } = useT();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a
          className="nav-brand"
          href="#/"
          onClick={(e) => { e.preventDefault(); onNavigate(''); setOpen(false); }}
        >
          <span className="dot"></span>
          <span>{t.nav.brand}</span>
        </a>
        <button className="nav-burger" onClick={() => setOpen(!open)}>
          {open ? t.nav.close : t.nav.menu}
        </button>
        <ul className={'nav-links ' + (open ? 'open' : '')}>
          {ROUTES.map((r) => (
            <li key={r.id}>
              <a
                href={'#/' + r.id}
                className={'nav-link ' + (current === r.id ? 'active' : '')}
                onClick={(e) => { e.preventDefault(); onNavigate(r.id); setOpen(false); }}
              >
                {r.num} {t.nav.links[r.id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
