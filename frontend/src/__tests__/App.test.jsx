import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import App from '../App';

function renderApp(hash = '#/') {
  window.location.hash = hash;
  return render(<App />);
}

describe('App', () => {
  it('renders nav', () => {
    renderApp();
    expect(document.querySelector('.nav')).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderApp();
    expect(document.querySelector('footer')).toBeInTheDocument();
  });

  it('renders gear button', () => {
    renderApp();
    expect(document.querySelector('button[aria-label]')).toBeInTheDocument();
  });

  it('renders HomePage for hash #/', () => {
    renderApp('#/');
    expect(document.querySelector('.hero-section')).toBeInTheDocument();
  });

  it('renders WorkPage for hash #/work', () => {
    window.location.hash = '#/work';
    render(<App />);
    expect(document.querySelector('.projects-grid')).toBeInTheDocument();
  });

  it('renders PathPage for hash #/path', () => {
    window.location.hash = '#/path';
    render(<App />);
    expect(document.querySelector('.timeline')).toBeInTheDocument();
  });

  it('renders StackPage for hash #/stack', () => {
    window.location.hash = '#/stack';
    render(<App />);
    expect(document.querySelector('.skills-grid')).toBeInTheDocument();
  });

  it('renders ContactPage for hash #/contact', () => {
    window.location.hash = '#/contact';
    render(<App />);
    expect(document.querySelector('form')).toBeInTheDocument();
  });

  it('sets data-theme attribute on documentElement', () => {
    renderApp();
    expect(document.documentElement.getAttribute('data-theme')).toBeTruthy();
  });
});
