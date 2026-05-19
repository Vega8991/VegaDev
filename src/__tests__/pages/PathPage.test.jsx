import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LangProvider } from '../../i18n/LangContext';
import PathPage from '../../pages/PathPage';

const renderPage = (lang = 'en') =>
  render(
    <LangProvider lang={lang}>
      <PathPage />
    </LangProvider>
  );

describe('PathPage', () => {
  it('renders hero section', () => {
    const { container } = renderPage();
    expect(container.querySelector('.hero-section')).toBeInTheDocument();
  });

  it('renders timeline', () => {
    const { container } = renderPage();
    expect(container.querySelector('.timeline')).toBeInTheDocument();
  });

  it('renders at least one timeline item', () => {
    const { container } = renderPage();
    expect(container.querySelectorAll('.tl-item').length).toBeGreaterThan(0);
  });

  it('renders marquee', () => {
    const { container } = renderPage();
    expect(container.querySelector('.marquee')).toBeInTheDocument();
  });

  it('renders email CV request link', () => {
    renderPage();
    const emailLink = screen.getAllByRole('link').find(
      (l) => l.getAttribute('href')?.startsWith('mailto:')
    );
    expect(emailLink).toBeInTheDocument();
  });
});
