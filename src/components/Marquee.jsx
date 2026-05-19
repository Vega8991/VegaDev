export default function Marquee({ items }) {
  const piece = (
    <span>
      {items.map((txt, i) => (
        <span key={i}>
          <span>{txt}</span>
          <span className="star"></span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {piece}
        {piece}
      </div>
    </div>
  );
}
