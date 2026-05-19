import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageCurtain from '../../components/PageCurtain';

describe('PageCurtain', () => {
  it('renders the label', () => {
    render(<PageCurtain keyId="test-1" label="WORK" />);
    expect(screen.getByText('WORK')).toBeInTheDocument();
  });

  it('applies the "in" class for the animation', () => {
    const { container } = render(<PageCurtain keyId="test-1" label="WORK" />);
    expect(container.firstChild).toHaveClass('page-curtain', 'in');
  });

  it('renders the label inside page-curtain-label span', () => {
    const { container } = render(<PageCurtain keyId="test-1" label="CONTACT" />);
    const label = container.querySelector('.page-curtain-label');
    expect(label).toBeInTheDocument();
    expect(label.textContent).toBe('CONTACT');
  });
});
