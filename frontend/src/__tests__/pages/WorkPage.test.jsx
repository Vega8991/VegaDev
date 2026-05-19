import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../i18n/LangContext';
import WorkPage from '../../pages/WorkPage';

const renderPage = (lang = 'en') =>
  render(
    <LangProvider lang={lang}>
      <WorkPage />
    </LangProvider>
  );

describe('WorkPage', () => {
  it('renders project list', () => {
    const { container } = renderPage();
    expect(container.querySelector('.projects-grid')).toBeInTheDocument();
  });

  it('renders filter buttons including "All"', () => {
    renderPage();
    expect(screen.getAllByRole('button').length).toBeGreaterThan(1);
  });

  it('filters projects by tech stack', () => {
    renderPage();
    const reactBtn = screen.getByRole('button', { name: 'React' });
    fireEvent.click(reactBtn);
    const rows = document.querySelectorAll('.project-row');
    rows.forEach((row) => {
      expect(row.textContent).toMatch(/React/);
    });
  });

  it('shows empty message when filter has no results', () => {
    renderPage();
    const noResultBtn = screen.queryByRole('button', { name: 'NONEXISTENT_TECH_XYZ' });
    expect(noResultBtn).not.toBeInTheDocument();
  });

  it('renders hero section', () => {
    const { container } = renderPage();
    expect(container.querySelector('.hero-section')).toBeInTheDocument();
  });

  it('renders marquee', () => {
    const { container } = renderPage();
    expect(container.querySelector('.marquee')).toBeInTheDocument();
  });
});
