import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../i18n/LangContext';
import HomePage from '../../pages/HomePage';

const renderPage = (onNavigate = vi.fn()) =>
  render(
    <LangProvider lang="en">
      <HomePage onNavigate={onNavigate} />
    </LangProvider>
  );

describe('HomePage', () => {
  it('renders hero section', () => {
    const { container } = renderPage();
    expect(container.querySelector('.hero-section')).toBeInTheDocument();
  });

  it('renders a work link that calls onNavigate', () => {
    const onNavigate = vi.fn();
    renderPage(onNavigate);
    const link = screen.getAllByRole('link').find(
      (l) => l.getAttribute('href') === '#/work'
    );
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(onNavigate).toHaveBeenCalledWith('work');
  });

  it('renders get in touch button that calls onNavigate with contact', () => {
    const onNavigate = vi.fn();
    renderPage(onNavigate);
    const link = screen.getAllByRole('link').find(
      (l) => l.getAttribute('href') === '#/contact'
    );
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    expect(onNavigate).toHaveBeenCalledWith('contact');
  });

  it('renders slider with featured projects', () => {
    const { container } = renderPage();
    expect(container.querySelector('.slider')).toBeInTheDocument();
  });

  it('renders marquee', () => {
    const { container } = renderPage();
    expect(container.querySelector('.marquee')).toBeInTheDocument();
  });
});
