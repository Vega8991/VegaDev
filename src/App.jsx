import { useState, useEffect } from 'react';
import { useRoute, navigate } from './hooks/useRoute';
import { LangProvider } from './i18n/LangContext';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio } from './components/TweaksPanel';
import Nav from './components/Nav';
import Footer from './components/Footer';
import PageCurtain from './components/PageCurtain';
import TweaksGearButton from './components/TweaksGearButton';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import PathPage from './pages/PathPage';
import StackPage from './pages/StackPage';
import ContactPage from './pages/ContactPage';
import { TRANSLATIONS } from './i18n/translations';
import { defaults } from './config';

export default function App() {
  const route = useRoute();
  const [curtainKey, setCurtainKey] = useState(null);

  const [t, setTweak] = useTweaks(defaults);
  const lang = t.lang === 'es' ? 'es' : 'en';
  const tr = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme || 'light');
  }, [t.theme]);

  const onNavigate = (path) => {
    if (path === route) return;
    setCurtainKey(path + '-' + Date.now());
    navigate(path);
  };

  let Page;
  switch (route) {
    case 'work': Page = <WorkPage onNavigate={onNavigate} />; break;
    case 'path': Page = <PathPage onNavigate={onNavigate} />; break;
    case 'stack': Page = <StackPage onNavigate={onNavigate} />; break;
    case 'contact': Page = <ContactPage onNavigate={onNavigate} />; break;
    default: Page = <HomePage onNavigate={onNavigate} />;
  }

  const curtainLabel = (tr.nav.links[route] || '').toUpperCase();

  return (
    <LangProvider lang={lang}>
      <Nav current={route} onNavigate={onNavigate} />
      <main key={route + '-' + lang}>{Page}</main>
      <Footer onNavigate={onNavigate} />
      {curtainKey && <PageCurtain keyId={curtainKey} label={curtainLabel} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === 'es' ? 'Tema' : 'Theme'}>
          <TweakRadio
            label={lang === 'es' ? 'Modo' : 'Mode'}
            value={t.theme}
            options={[
              { value: 'light', label: lang === 'es' ? 'Claro' : 'Light' },
              { value: 'dark', label: lang === 'es' ? 'Oscuro' : 'Dark' },
            ]}
            onChange={(v) => setTweak('theme', v)}
          />
        </TweakSection>
        <TweakSection label={lang === 'es' ? 'Idioma' : 'Language'}>
          <TweakRadio
            label={lang === 'es' ? 'Idioma' : 'Language'}
            value={lang}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' },
            ]}
            onChange={(v) => setTweak('lang', v)}
          />
        </TweakSection>
      </TweaksPanel>

      <TweaksGearButton label={lang === 'es' ? 'Abrir ajustes' : 'Open tweaks'} />
    </LangProvider>
  );
}
