import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubGlobal('IntersectionObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
});

window.scrollTo = vi.fn();
window.postMessage = vi.fn();
