import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../i18n/LangContext';
import Nav from '../../components/Nav';

const renderNav = (props = {}) =>
  render(
    <LangProvider lang="en">
      <Nav current="" onNavigate={vi.fn()} {...props} />
    </LangProvider>
  );

describe('Nav', () => {
  it('renders brand link', () => {
    renderNav();
    expect(screen.getByText(/vega/i)).toBeInTheDocument();
  });

  it('renders all route links', () => {
    renderNav();
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(5);
  });

  it('marks current route as active', () => {
    renderNav({ current: 'work' });
    const links = screen.getAllByRole('link');
    const workLink = links.find((l) => l.getAttribute('href') === '#/work');
    expect(workLink).toHaveClass('active');
  });

  it('opens/closes menu on burger click', () => {
    renderNav();
    const burger = screen.getByRole('button');
    const ul = burger.closest('nav').querySelector('.nav-links');
    expect(ul).not.toHaveClass('open');
    fireEvent.click(burger);
    expect(ul).toHaveClass('open');
    fireEvent.click(burger);
    expect(ul).not.toHaveClass('open');
  });

  it('calls onNavigate and closes menu when a link is clicked', () => {
    const onNavigate = vi.fn();
    renderNav({ onNavigate });
    const burger = screen.getByRole('button');
    fireEvent.click(burger);
    const workLink = screen.getAllByRole('link').find((l) => l.getAttribute('href') === '#/work');
    fireEvent.click(workLink);
    expect(onNavigate).toHaveBeenCalledWith('work');
  });

  it('calls onNavigate with empty string when brand is clicked', () => {
    const onNavigate = vi.fn();
    renderNav({ onNavigate });
    const brandLink = screen.getAllByRole('link').find((l) => l.getAttribute('href') === '#/');
    fireEvent.click(brandLink);
    expect(onNavigate).toHaveBeenCalledWith('');
  });
});
