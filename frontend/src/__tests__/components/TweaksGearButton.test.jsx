import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import TweaksGearButton from '../../components/TweaksGearButton';

describe('TweaksGearButton', () => {
  it('renders a button', () => {
    const { container } = render(<TweaksGearButton label="Open tweaks" />);
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('has the correct aria-label', () => {
    const { getByLabelText } = render(<TweaksGearButton label="Open tweaks" />);
    expect(getByLabelText('Open tweaks')).toBeInTheDocument();
  });

  it('posts __activate_edit_mode on click', () => {
    window.postMessage = vi.fn();
    const { getByLabelText } = render(<TweaksGearButton label="Open tweaks" />);
    fireEvent.click(getByLabelText('Open tweaks'));
    expect(window.postMessage).toHaveBeenCalledWith({ type: '__activate_edit_mode' }, '*');
  });
});
