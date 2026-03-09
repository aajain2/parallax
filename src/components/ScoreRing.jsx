import { useCountUp } from '../hooks';

export default function ScoreRing({
  value,
  max = 1,
  size = 120,
  strokeWidth = 1,
  fontSize = 48,
  label,
  sublabel,
  displayValue,
  delay = 0,
}) {
  const animated = useCountUp(value, 1800, delay);
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = animated / max;
  const dashOffset = circumference * (1 - progress);

  const display = displayValue
    ? typeof displayValue === 'function' ? displayValue(animated) : displayValue
    : max <= 1
      ? animated.toFixed(2)
      : Math.round(animated).toString();

  return (
    <div className="score-ring-container">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1.8s ease-in-out' }}
        />
      </svg>
      <div style={{ marginTop: -size / 2 - fontSize / 1.5, position: 'relative', zIndex: 1 }}>
        <div className="score-ring-value" style={{ fontSize }}>{display}</div>
      </div>
      <div style={{ height: size / 2 - fontSize / 1.5 + 8 }} />
      {label && <div className="score-ring-label">{label}</div>}
      {sublabel && <div className="score-ring-sub">{sublabel}</div>}
    </div>
  );
}
