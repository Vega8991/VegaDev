import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Marquee from '../../components/Marquee';

describe('Marquee', () => {
  const items = ['REACT', 'VITE', 'CSS'];

  it('renders all items', () => {
    render(<Marquee items={items} />);
    items.forEach((item) => {
      const matches = screen.getAllByText(item);
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it('duplicates the track for seamless loop', () => {
    const { container } = render(<Marquee items={items} />);
    const track = container.querySelector('.marquee-track');
    // track has 2 children (the two copies of the piece)
    expect(track.children.length).toBe(2);
  });

  it('renders the marquee wrapper', () => {
    const { container } = render(<Marquee items={items} />);
    expect(container.querySelector('.marquee')).toBeInTheDocument();
  });
});
