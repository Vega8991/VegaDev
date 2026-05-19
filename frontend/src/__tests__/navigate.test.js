import { describe, it, expect, beforeEach, vi } from 'vitest';
import { navigate } from '../hooks/useRoute';

describe('navigate', () => {
  beforeEach(() => {
    window.location.hash = '';
    window.scrollTo = vi.fn();
  });

  it('sets window.location.hash to the given path', () => {
    navigate('work');
    expect(window.location.hash).toBe('#/work');
  });

  it('sets hash to #/ for empty string (home)', () => {
    navigate('');
    expect(window.location.hash).toBe('#/');
  });

  it('calls window.scrollTo with top: 0', () => {
    navigate('contact');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('works for all defined routes', () => {
    const routes = ['', 'work', 'path', 'stack', 'contact'];
    routes.forEach((route) => {
      navigate(route);
      expect(window.location.hash).toBe(`#/${route}`);
    });
  });
});
