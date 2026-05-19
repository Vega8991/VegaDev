export default function TweaksGearButton({ label }) {
  const open = () => window.postMessage({ type: '__activate_edit_mode' }, '*');
  return (
    <button className="tweaks-gear" onClick={open} aria-label={label} title={label}>
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        />
        <path
          fill="currentColor"
          d="m19.4 13 2-1.2-1.5-2.6-2.3.5a7.6 7.6 0 0 0-1.6-1L15.2 6h-3l-.7 2.6c-.6.3-1.1.6-1.6 1L7.6 9.2 6.1 11.8l2 1.2c-.1.3-.1.6-.1 1s0 .7.1 1l-2 1.2 1.5 2.6 2.3-.5c.5.4 1 .7 1.6 1l.7 2.6h3l.7-2.6c.6-.3 1.1-.6 1.6-1l2.3.5 1.5-2.6-2-1.2c.1-.3.1-.6.1-1s0-.7-.1-1Z"
        />
      </svg>
    </button>
  );
}
