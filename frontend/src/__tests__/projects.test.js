import { describe, it, expect } from 'vitest';
import { PROJECTS } from '../data/projects';

const REQUIRED_FIELDS = ['id', 'num', 'year', 'stack', 'github', 'demo', 'featured', 'glyph'];

describe('PROJECTS', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(PROJECTS)).toBe(true);
    expect(PROJECTS.length).toBeGreaterThan(0);
  });

  it('all ids are unique', () => {
    const ids = PROJECTS.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('all nums are unique', () => {
    const nums = PROJECTS.map((p) => p.num);
    const unique = new Set(nums);
    expect(unique.size).toBe(nums.length);
  });

  REQUIRED_FIELDS.forEach((field) => {
    it(`every project has a "${field}" field`, () => {
      PROJECTS.forEach((p) => {
        expect(p).toHaveProperty(field);
      });
    });
  });

  it('stack is a non-empty array on every project', () => {
    PROJECTS.forEach((p) => {
      expect(Array.isArray(p.stack)).toBe(true);
      expect(p.stack.length).toBeGreaterThan(0);
    });
  });

  it('github is a valid url on every project', () => {
    PROJECTS.forEach((p) => {
      expect(p.github).toMatch(/^https:\/\//);
    });
  });

  it('featured is a boolean on every project', () => {
    PROJECTS.forEach((p) => {
      expect(typeof p.featured).toBe('boolean');
    });
  });
});
