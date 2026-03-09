import { useEffect, useState } from 'react';
import { momentData } from '../data';
import Genmoji, { getMomentExpression } from '../components/Genmoji';

export default function MomentDetail({ onBack }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 300);
    return () => clearTimeout(t);
  }, []);

  const expression = getMomentExpression(momentData.insight);

  return (
    <div className="screen-container">
      <button className="back-btn" onClick={onBack}>← Session</button>

      <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 2 }}>
        {momentData.person}
      </div>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
        {momentData.timeIntoSession} into session
      </div>

      {/* Large genmoji with surrounding rings */}
      <div className="moment-figure">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 80 + i * 40,
              height: 80 + i * 40,
              borderRadius: '50%',
              border: `1px solid rgba(255,255,255,${0.08 - i * 0.02})`,
              opacity: pulse ? 1 : 0,
              transform: pulse ? 'scale(1)' : 'scale(0.9)',
              transition: `all ${0.4 + i * 0.15}s ease ${i * 0.1}s`,
            }}
          />
        ))}
        <div style={{
          position: 'relative',
          zIndex: 1,
          width: 80,
          height: 80,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Genmoji expression={expression} size={80} />
        </div>
      </div>

      <div className="insight-card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span className="warning-icon">!</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {momentData.insight}
            </div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: 13, fontWeight: 500, marginTop: 6, cursor: 'pointer' }}>
              Full moment analysis →
            </div>
          </div>
        </div>
      </div>

      <div className="moment-metrics">
        {momentData.metrics.map((m, i) => (
          <div key={i} className="metric-chip">
            {m.icon === 'dual-ring' && (
              <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block', margin: '0 auto 6px' }}>
                <circle cx="5.5" cy="8" r="4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <circle cx="10.5" cy="8" r="4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </svg>
            )}
            {m.icon === 'arrow-up' && (
              <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block', margin: '0 auto 6px' }}>
                <path d="M 8 2 L 8 14 M 4 6 L 8 2 L 12 6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              </svg>
            )}
            {m.icon === 'dot-filled' && (
              <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block', margin: '0 auto 6px' }}>
                <circle cx="8" cy="8" r="4" fill="rgba(255,255,255,0.4)" />
              </svg>
            )}
            {m.label}
          </div>
        ))}
      </div>
    </div>
  );
}
