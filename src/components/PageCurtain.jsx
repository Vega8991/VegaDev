export default function PageCurtain({ label, keyId }) {
  return (
    <div key={keyId} className="page-curtain in">
      <span className="page-curtain-label">{label}</span>
    </div>
  );
}
