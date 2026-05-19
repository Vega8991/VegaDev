import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakToggle,
  TweakSlider,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakButton,
  TweakNumber,
  TweakColor,
} from '../../components/TweaksPanel';

// ── useTweaks ──────────────────────────────────────────────
describe('useTweaks', () => {
  it('returns the defaults', () => {
    const { result } = renderHook(() => useTweaks({ theme: 'dark', lang: 'en' }));
    expect(result.current[0]).toEqual({ theme: 'dark', lang: 'en' });
  });

  it('updates a single key via setTweak(key, value)', () => {
    const { result } = renderHook(() => useTweaks({ theme: 'dark' }));
    act(() => result.current[1]('theme', 'light'));
    expect(result.current[0].theme).toBe('light');
  });

  it('updates multiple keys via setTweak({ key: value })', () => {
    const { result } = renderHook(() => useTweaks({ theme: 'dark', lang: 'en' }));
    act(() => result.current[1]({ theme: 'light', lang: 'es' }));
    expect(result.current[0]).toEqual({ theme: 'light', lang: 'es' });
  });
});

// ── TweaksPanel ────────────────────────────────────────────
describe('TweaksPanel', () => {
  it('is hidden by default', () => {
    const { container } = render(<TweaksPanel title="Tweaks"><p>hi</p></TweaksPanel>);
    expect(container.querySelector('.twk-panel')).not.toBeInTheDocument();
  });

  it('opens on __activate_edit_mode message', async () => {
    const { container } = render(<TweaksPanel title="Tweaks"><p>hi</p></TweaksPanel>);
    act(() => {
      window.dispatchEvent(new MessageEvent('message', { data: { type: '__activate_edit_mode' } }));
    });
    await waitFor(() => expect(container.querySelector('.twk-panel')).toBeInTheDocument());
  });

  it('shows the title and children when open', async () => {
    render(<TweaksPanel title="My Panel"><p>Panel content</p></TweaksPanel>);
    act(() => {
      window.dispatchEvent(new MessageEvent('message', { data: { type: '__activate_edit_mode' } }));
    });
    await waitFor(() => {
      expect(screen.getByText('My Panel')).toBeInTheDocument();
      expect(screen.getByText('Panel content')).toBeInTheDocument();
    });
  });

  it('closes on __deactivate_edit_mode message', async () => {
    const { container } = render(<TweaksPanel title="Tweaks"><p>hi</p></TweaksPanel>);
    act(() => {
      window.dispatchEvent(new MessageEvent('message', { data: { type: '__activate_edit_mode' } }));
    });
    await waitFor(() => expect(container.querySelector('.twk-panel')).toBeInTheDocument());
    act(() => {
      window.dispatchEvent(new MessageEvent('message', { data: { type: '__deactivate_edit_mode' } }));
    });
    await waitFor(() => expect(container.querySelector('.twk-panel')).not.toBeInTheDocument());
  });
});

// ── TweakSection ───────────────────────────────────────────
describe('TweakSection', () => {
  it('renders the label', () => {
    render(<TweakSection label="Theme"><p>child</p></TweakSection>);
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<TweakSection label="Theme"><p>child content</p></TweakSection>);
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});

// ── TweakToggle ────────────────────────────────────────────
describe('TweakToggle', () => {
  it('renders label', () => {
    render(<TweakToggle label="Dark mode" value={false} onChange={() => {}} />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('calls onChange with true when off and clicked', () => {
    const onChange = vi.fn();
    render(<TweakToggle label="Test" value={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when on and clicked', () => {
    const onChange = vi.fn();
    render(<TweakToggle label="Test" value={true} onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('reflects aria-checked state', () => {
    const { rerender } = render(<TweakToggle label="Test" value={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    rerender(<TweakToggle label="Test" value={true} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });
});

// ── TweakSlider ────────────────────────────────────────────
describe('TweakSlider', () => {
  it('renders label and current value', () => {
    render(<TweakSlider label="Font size" value={16} unit="px" onChange={() => {}} />);
    expect(screen.getByText('Font size')).toBeInTheDocument();
    expect(screen.getByText('16px')).toBeInTheDocument();
  });

  it('calls onChange with numeric value on input', () => {
    const onChange = vi.fn();
    render(<TweakSlider label="Size" value={16} onChange={onChange} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '24' } });
    expect(onChange).toHaveBeenCalledWith(24);
  });
});

// ── TweakRadio ─────────────────────────────────────────────
describe('TweakRadio', () => {
  const options = [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }];

  it('renders all options', () => {
    render(<TweakRadio label="Mode" value="light" options={options} onChange={() => {}} />);
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('renders as select when options labels are too long', () => {
    const longOptions = [{ value: 'a', label: 'A very long option label' }, { value: 'b', label: 'Another very long option' }];
    render(<TweakRadio label="Mode" value="a" options={longOptions} onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});

// ── TweakSelect ────────────────────────────────────────────
describe('TweakSelect', () => {
  const options = [{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }];

  it('renders all options', () => {
    render(<TweakSelect label="Pick" value="a" options={options} onChange={() => {}} />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('calls onChange on selection', () => {
    const onChange = vi.fn();
    render(<TweakSelect label="Pick" value="a" options={options} onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'b' } });
    expect(onChange).toHaveBeenCalledWith('b');
  });
});

// ── TweakText ──────────────────────────────────────────────
describe('TweakText', () => {
  it('renders label and input', () => {
    render(<TweakText label="Name" value="Vega" placeholder="Enter name" onChange={() => {}} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Vega')).toBeInTheDocument();
  });

  it('calls onChange on input', () => {
    const onChange = vi.fn();
    render(<TweakText label="Name" value="" placeholder="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledWith('test');
  });
});

// ── TweakButton ────────────────────────────────────────────
describe('TweakButton', () => {
  it('renders label', () => {
    render(<TweakButton label="Reset" onClick={() => {}} />);
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<TweakButton label="Reset" onClick={onClick} />);
    fireEvent.click(screen.getByText('Reset'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies secondary class', () => {
    render(<TweakButton label="Reset" onClick={() => {}} secondary />);
    expect(screen.getByText('Reset')).toHaveClass('twk-btn', 'secondary');
  });
});

// ── TweakRow ───────────────────────────────────────────────
describe('TweakRow', () => {
  it('renders label', () => {
    render(<TweakRow label="Opacity"><span>child</span></TweakRow>);
    expect(screen.getByText('Opacity')).toBeInTheDocument();
  });

  it('renders value when provided', () => {
    render(<TweakRow label="Size" value="16px"><span /></TweakRow>);
    expect(screen.getByText('16px')).toBeInTheDocument();
  });

  it('applies inline class when inline prop is set', () => {
    const { container } = render(<TweakRow label="X" inline><span /></TweakRow>);
    expect(container.firstChild).toHaveClass('twk-row-h');
  });
});

// ── TweakNumber ────────────────────────────────────────────
describe('TweakNumber', () => {
  it('renders label', () => {
    render(<TweakNumber label="Size" value={16} onChange={() => {}} />);
    expect(screen.getByText('Size')).toBeInTheDocument();
  });

  it('renders number input', () => {
    render(<TweakNumber label="Size" value={16} onChange={() => {}} />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('calls onChange on input change', () => {
    const onChange = vi.fn();
    render(<TweakNumber label="Size" value={16} onChange={onChange} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '24' } });
    expect(onChange).toHaveBeenCalledWith(24);
  });

  it('clamps to min when below range', () => {
    const onChange = vi.fn();
    render(<TweakNumber label="Size" value={16} min={10} max={100} onChange={onChange} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '2' } });
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('clamps to max when above range', () => {
    const onChange = vi.fn();
    render(<TweakNumber label="Size" value={16} min={10} max={100} onChange={onChange} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '200' } });
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it('renders unit when provided', () => {
    render(<TweakNumber label="Size" value={16} unit="px" onChange={() => {}} />);
    expect(screen.getByText('px')).toBeInTheDocument();
  });
});

// ── TweakColor ─────────────────────────────────────────────
describe('TweakColor', () => {
  it('renders color input when no options', () => {
    const { container } = render(<TweakColor label="Color" value="#ff0000" onChange={() => {}} />);
    expect(container.querySelector('input[type="color"]')).toBeInTheDocument();
  });

  it('calls onChange on color input change', () => {
    const onChange = vi.fn();
    const { container } = render(<TweakColor label="Color" value="#ff0000" onChange={onChange} />);
    fireEvent.change(container.querySelector('input[type="color"]'), { target: { value: '#00ff00' } });
    expect(onChange).toHaveBeenCalledWith('#00ff00');
  });

  it('renders chip buttons when options provided', () => {
    const options = ['#ff0000', '#00ff00', '#0000ff'];
    const { container } = render(
      <TweakColor label="Color" value="#ff0000" options={options} onChange={() => {}} />
    );
    expect(container.querySelectorAll('.twk-chip').length).toBe(3);
  });

  it('calls onChange with option value when chip clicked', () => {
    const onChange = vi.fn();
    const options = ['#ff0000', '#00ff00'];
    const { container } = render(
      <TweakColor label="Color" value="#ff0000" options={options} onChange={onChange} />
    );
    fireEvent.click(container.querySelectorAll('.twk-chip')[1]);
    expect(onChange).toHaveBeenCalledWith('#00ff00');
  });
});

// ── TweaksPanel close button ───────────────────────────────
describe('TweaksPanel close button', () => {
  it('closes panel when close button clicked', async () => {
    const { container } = render(<TweaksPanel title="Tweaks"><p>hi</p></TweaksPanel>);
    act(() => {
      window.dispatchEvent(new MessageEvent('message', { data: { type: '__activate_edit_mode' } }));
    });
    await waitFor(() => expect(container.querySelector('.twk-panel')).toBeInTheDocument());
    fireEvent.click(screen.getByLabelText('Close tweaks'));
    await waitFor(() => expect(container.querySelector('.twk-panel')).not.toBeInTheDocument());
  });
});
