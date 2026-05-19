import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoute, navigate } from '../hooks/useRoute';

describe('useRoute', () => {
  beforeEach(() => {
    window.location.hash = '#/';
  });

  it('returns empty string for home route (#/)', () => {
    window.location.hash = '#/';
    const { result } = renderHook(() => useRoute());
    expect(result.current).toBe('');
  });

  it('returns the correct route segment from hash', () => {
    window.location.hash = '#/work';
    const { result } = renderHook(() => useRoute());
    expect(result.current).toBe('work');
  });

  it('updates when hash changes via hashchange event', () => {
    window.location.hash = '#/';
    const { result } = renderHook(() => useRoute());
    expect(result.current).toBe('');

    act(() => {
      window.location.hash = '#/contact';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    expect(result.current).toBe('contact');
  });
});

describe('navigate', () => {
  beforeEach(() => {
    window.location.hash = '';
    window.scrollTo = vi.fn();
  });

  it('sets hash to #/<path>', () => {
    navigate('work');
    expect(window.location.hash).toBe('#/work');
  });

  it('sets hash to #/ for home (empty string)', () => {
    navigate('');
    expect(window.location.hash).toBe('#/');
  });

  it('calls scrollTo with top: 0', () => {
    navigate('stack');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });
});
