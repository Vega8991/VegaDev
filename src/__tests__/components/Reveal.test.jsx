import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Reveal from '../../components/Reveal';

describe('Reveal', () => {
  it('renders children', () => {
    const { getByText } = render(<Reveal><p>Hello</p></Reveal>);
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('applies "reveal" class by default', () => {
    const { container } = render(<Reveal><span /></Reveal>);
    expect(container.firstChild).toHaveClass('reveal');
  });

  it('applies "reveal-stagger" class when stagger prop is set', () => {
    const { container } = render(<Reveal stagger><span /></Reveal>);
    expect(container.firstChild).toHaveClass('reveal-stagger');
  });

  it('merges extra className', () => {
    const { container } = render(<Reveal className="extra"><span /></Reveal>);
    expect(container.firstChild).toHaveClass('extra');
  });

  it('renders as a different tag when "as" prop is provided', () => {
    const { container } = render(<Reveal as="section"><span /></Reveal>);
    expect(container.firstChild.tagName).toBe('SECTION');
  });
});
