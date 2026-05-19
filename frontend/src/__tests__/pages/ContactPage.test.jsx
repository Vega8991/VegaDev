import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LangProvider } from '../../i18n/LangContext';
import ContactPage from '../../pages/ContactPage';

const renderPage = (lang = 'en') =>
  render(
    <LangProvider lang={lang}>
      <ContactPage />
    </LangProvider>
  );

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Vega' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'hello world this is a message' } });
};

const getSubmitBtn = () => screen.getByRole('button', { name: /transmit|→|\.\.\./i });

describe('ContactPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the contact form', () => {
    const { container } = renderPage();
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders name, email, message fields', () => {
    renderPage();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows error when submitted empty', () => {
    renderPage();
    fireEvent.click(getSubmitBtn());
    expect(screen.getAllByText(/⚠/).length).toBeGreaterThan(0);
  });

  it('shows email error for invalid email', () => {
    renderPage();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'notanemail' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'hello world this is a message' } });
    fireEvent.click(getSubmitBtn());
    expect(screen.getByText(/⚠/)).toBeInTheDocument();
  });

  it('shows success message on valid submit', async () => {
    renderPage();
    fillValidForm();
    fireEvent.click(getSubmitBtn());
    await waitFor(() => expect(screen.queryAllByText(/⚠/).length).toBe(0));
  });

  it('shows server error when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    renderPage();
    fillValidForm();
    fireEvent.click(getSubmitBtn());
    await waitFor(() => expect(screen.getByText(/⚠ Network error/i)).toBeInTheDocument());
  });

  it('renders social links', () => {
    renderPage();
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    const hasGithub = hrefs.some((h) => h?.includes('github'));
    expect(hasGithub).toBe(true);
  });

  it('renders marquee', () => {
    const { container } = renderPage();
    expect(container.querySelector('.marquee')).toBeInTheDocument();
  });
});
