// Genmoji: animated face expressions representing how a person came across
// Expressions: warm, guarded, intense, neutral, playful, distant

const EXPRESSIONS = {
  warm: { eyes: 'happy', mouth: 'smile', color: '#8B7D3C' },
  guarded: { eyes: 'narrow', mouth: 'flat', color: '#5B7B94' },
  intense: { eyes: 'wide', mouth: 'tight', color: '#A0524A' },
  neutral: { eyes: 'normal', mouth: 'slight', color: '#8C6E4A' },
  playful: { eyes: 'happy', mouth: 'grin', color: '#3A7D7B' },
  distant: { eyes: 'look-away', mouth: 'flat', color: '#5B7B94' },
};

function Eyes({ type, size }) {
  const s = size / 28;
  switch (type) {
    case 'happy':
      return (
        <>
          <path d={`M${9*s} ${11*s} Q${10.5*s} ${9*s} ${12*s} ${11*s}`} fill="none" stroke="white" strokeWidth={1.2*s} strokeLinecap="round" />
          <path d={`M${16*s} ${11*s} Q${17.5*s} ${9*s} ${19*s} ${11*s}`} fill="none" stroke="white" strokeWidth={1.2*s} strokeLinecap="round" />
        </>
      );
    case 'narrow':
      return (
        <>
          <line x1={9*s} y1={11*s} x2={12*s} y2={11*s} stroke="white" strokeWidth={1.5*s} strokeLinecap="round" />
          <line x1={16*s} y1={11*s} x2={19*s} y2={11*s} stroke="white" strokeWidth={1.5*s} strokeLinecap="round" />
        </>
      );
    case 'wide':
      return (
        <>
          <circle cx={10.5*s} cy={10.5*s} r={2*s} fill="white" />
          <circle cx={17.5*s} cy={10.5*s} r={2*s} fill="white" />
        </>
      );
    case 'look-away':
      return (
        <>
          <circle cx={11*s} cy={11*s} r={1.5*s} fill="white" opacity="0.7" />
          <circle cx={18*s} cy={11*s} r={1.5*s} fill="white" opacity="0.7">
            <animateTransform attributeName="transform" type="translate" values={`0,0; ${s},0; 0,0`} dur="3s" repeatCount="indefinite" />
          </circle>
        </>
      );
    default: // normal
      return (
        <>
          <circle cx={10.5*s} cy={11*s} r={1.5*s} fill="white" />
          <circle cx={17.5*s} cy={11*s} r={1.5*s} fill="white" />
        </>
      );
  }
}

function Mouth({ type, size }) {
  const s = size / 28;
  switch (type) {
    case 'smile':
      return <path d={`M${10*s} ${17*s} Q${14*s} ${20*s} ${18*s} ${17*s}`} fill="none" stroke="white" strokeWidth={1.2*s} strokeLinecap="round" />;
    case 'grin':
      return <path d={`M${9*s} ${16*s} Q${14*s} ${21*s} ${19*s} ${16*s}`} fill="none" stroke="white" strokeWidth={1.2*s} strokeLinecap="round" />;
    case 'tight':
      return <line x1={11*s} y1={17.5*s} x2={17*s} y2={17*s} stroke="white" strokeWidth={1.2*s} strokeLinecap="round" />;
    case 'flat':
      return <line x1={11*s} y1={17.5*s} x2={17*s} y2={17.5*s} stroke="white" strokeWidth={1*s} strokeLinecap="round" opacity="0.6" />;
    default: // slight
      return <path d={`M${11*s} ${17*s} Q${14*s} ${18.5*s} ${17*s} ${17*s}`} fill="none" stroke="white" strokeWidth={1*s} strokeLinecap="round" />;
  }
}

export default function Genmoji({ expression = 'neutral', size = 28 }) {
  const expr = EXPRESSIONS[expression] || EXPRESSIONS.neutral;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="genmoji">
      {/* Face background */}
      <circle cx={size/2} cy={size/2} r={size/2 - 1} fill={expr.color} opacity="0.85" />
      {/* Subtle breathing animation */}
      <circle cx={size/2} cy={size/2} r={size/2 - 1} fill={expr.color} opacity="0.15">
        <animate attributeName="r" values={`${size/2 - 1};${size/2};${size/2 - 1}`} dur="3s" repeatCount="indefinite" />
      </circle>
      <Eyes type={expr.eyes} size={size} />
      <Mouth type={expr.mouth} size={size} />
    </svg>
  );
}

// Helper: assign expressions based on session context
export function getSessionExpressions(session) {
  const score = session.overlapScore;
  if (score > 55) return session.people.map((_, i) => i === 0 ? 'warm' : 'playful');
  if (score > 40) return session.people.map((_, i) => i === 0 ? 'neutral' : 'guarded');
  return session.people.map(() => 'distant');
}

export function getMomentExpression(insight) {
  if (insight.includes('passive-aggressive')) return 'guarded';
  if (insight.includes('weight')) return 'intense';
  return 'neutral';
}
