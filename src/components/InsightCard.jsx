export default function InsightCard({ text, label = 'INSIGHT', onClick }) {
  return (
    <div className="insight-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="insight-label">{label}</div>
      <div className="insight-text">
        {text}
        {onClick && <span className="insight-arrow"> →</span>}
      </div>
    </div>
  );
}
