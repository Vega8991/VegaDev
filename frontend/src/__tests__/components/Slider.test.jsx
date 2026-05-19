import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LangProvider } from '../../i18n/LangContext';
import Slider from '../../components/Slider';
import { PROJECTS } from '../../data/projects';

const featuredProjects = PROJECTS.filter((p) => p.featured);

const renderSlider = (projects = PROJECTS) =>
  render(
    <LangProvider lang="en">
      <Slider projects={projects} />
    </LangProvider>
  );

describe('Slider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a dot per featured project', () => {
    renderSlider();
    const dots = screen.getAllByRole('button', { name: /Slide/i });
    expect(dots).toHaveLength(featuredProjects.length);
  });

  it('first dot is active initially', () => {
    const { container } = renderSlider();
    const dots = container.querySelectorAll('.slider-dot');
    expect(dots[0]).toHaveClass('active');
  });

  it('clicking a dot changes active slide', () => {
    const { container } = renderSlider();
    const dots = screen.getAllByRole('button', { name: /Slide/i });
    fireEvent.click(dots[1]);
    const dotEls = container.querySelectorAll('.slider-dot');
    expect(dotEls[1]).toHaveClass('active');
  });

  it('clicking next arrow advances slide', () => {
    const { container } = renderSlider();
    fireEvent.click(screen.getByLabelText('→'));
    const dots = container.querySelectorAll('.slider-dot');
    expect(dots[1]).toHaveClass('active');
  });

  it('clicking prev arrow wraps to last slide', () => {
    const { container } = renderSlider();
    fireEvent.click(screen.getByLabelText('←'));
    const dots = container.querySelectorAll('.slider-dot');
    expect(dots[featuredProjects.length - 1]).toHaveClass('active');
  });

  it('auto-advances after 7000ms', () => {
    const { container } = renderSlider();
    act(() => { vi.advanceTimersByTime(7000); });
    const dots = container.querySelectorAll('.slider-dot');
    expect(dots[1]).toHaveClass('active');
  });

  it('renders prev/next arrow buttons', () => {
    renderSlider();
    expect(screen.getByLabelText('←')).toBeInTheDocument();
    expect(screen.getByLabelText('→')).toBeInTheDocument();
  });
});
