import { describe, it, expect } from 'vitest';
import { owner, defaults } from '../config';

describe('owner', () => {
  it('has a name', () => {
    expect(typeof owner.name).toBe('string');
    expect(owner.name.length).toBeGreaterThan(0);
  });

  it('has a valid email', () => {
    expect(owner.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('has a github url and handle', () => {
    expect(owner.github.url).toMatch(/^https:\/\/github\.com\//);
    expect(owner.github.handle).toMatch(/^@/);
  });

  it('has a linkedin url and handle', () => {
    expect(owner.linkedin.url).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
    expect(owner.linkedin.handle).toMatch(/^in\//);
  });
});

describe('defaults', () => {
  it('theme is light or dark', () => {
    expect(['light', 'dark']).toContain(defaults.theme);
  });

  it('lang is en or es', () => {
    expect(['en', 'es']).toContain(defaults.lang);
  });
});
