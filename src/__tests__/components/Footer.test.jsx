import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider } from '../../i18n/LangContext';
import Footer from '../../components/Footer';
import { owner } from '../../config';

const renderFooter = (onNavigate = vi.fn()) =>
  render(
    <LangProvider lang="en">
      <Footer onNavigate={onNavigate} />
    </LangProvider>
  );

describe('Footer', () => {
  it('renders footer element', () => {
    const { container } = renderFooter();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders GitHub link with owner url', () => {
    renderFooter();
    const githubLink = screen.getAllByRole('link').find(
      (l) => l.getAttribute('href') === owner.github.url
    );
    expect(githubLink).toBeInTheDocument();
  });

  it('renders LinkedIn link with owner url', () => {
    renderFooter();
    const linkedinLink = screen.getAllByRole('link').find(
      (l) => l.getAttribute('href') === owner.linkedin.url
    );
    expect(linkedinLink).toBeInTheDocument();
  });

  it('renders email link', () => {
    renderFooter();
    const emailLink = screen.getAllByRole('link').find(
      (l) => l.getAttribute('href') === `mailto:${owner.email}`
    );
    expect(emailLink).toBeInTheDocument();
  });

  it('calls onNavigate when contact CTA is clicked', () => {
    const onNavigate = vi.fn();
    renderFooter(onNavigate);
    const contactLinks = screen.getAllByRole('link').filter(
      (l) => l.getAttribute('href') === '#/contact'
    );
    fireEvent.click(contactLinks[0]);
    expect(onNavigate).toHaveBeenCalledWith('contact');
  });

  it('renders all route links in sitemap', () => {
    renderFooter();
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('#/work');
    expect(hrefs).toContain('#/stack');
  });
});
