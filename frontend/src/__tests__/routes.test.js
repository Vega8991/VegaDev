import { describe, it, expect } from 'vitest';
import { ROUTES } from '../data/routes';

describe('ROUTES', () => {
  it('has 5 entries', () => {
    expect(ROUTES).toHaveLength(5);
  });

  it('first route is home with empty id', () => {
    expect(ROUTES[0].id).toBe('');
    expect(ROUTES[0].num).toBe('01');
  });

  it('contains work, path, stack and contact', () => {
    const ids = ROUTES.map((r) => r.id);
    expect(ids).toContain('work');
    expect(ids).toContain('path');
    expect(ids).toContain('stack');
    expect(ids).toContain('contact');
  });

  it('every route has id and num', () => {
    ROUTES.forEach((r) => {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('num');
    });
  });

  it('nums are sequential strings 01–05', () => {
    const nums = ROUTES.map((r) => r.num);
    expect(nums).toEqual(['01', '02', '03', '04', '05']);
  });
});
