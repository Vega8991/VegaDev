import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LangProvider } from '../../i18n/LangContext';
import StackPage from '../../pages/StackPage';

const renderPage = (lang = 'en') =>
  render(
    <LangProvider lang={lang}>
      <StackPage />
    </LangProvider>
  );

describe('StackPage', () => {
  it('renders hero section', () => {
    const { container } = renderPage();
    expect(container.querySelector('.hero-section')).toBeInTheDocument();
  });

  it('renders skills grid', () => {
    const { container } = renderPage();
    expect(container.querySelector('.skills-grid')).toBeInTheDocument();
  });

  it('renders three skill columns', () => {
    const { container } = renderPage();
    expect(container.querySelectorAll('.skill-col')).toHaveLength(3);
  });

  it('renders skill tags', () => {
    const { container } = renderPage();
    expect(container.querySelectorAll('.skill-tag').length).toBeGreaterThan(0);
  });

  it('renders marquee', () => {
    const { container } = renderPage();
    expect(container.querySelector('.marquee')).toBeInTheDocument();
  });

  it('renders Next.js in currently learning section', () => {
    renderPage();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});
