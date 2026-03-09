import { useEffect, useState } from 'react';
import ScoreRing from '../components/ScoreRing';
import InsightCard from '../components/InsightCard';
import Genmoji from '../components/Genmoji';
import { scoreTrend, friendInsight, constellationDots } from '../data';
import { useStaggeredMount } from '../hooks';

function FriendTrendChart({ data }) {
  const w = 320, h = 100, px = 8, py = 8;
  const minS = Math.min(...data.map(d => d.score)) - 5;
  const maxS = Math.max(...data.map(d => d.score)) + 5;
  const avg = data.reduce((s, d) => s + d.score, 0) / data.length;

  const points = data.map((d, i) => ({
    x: px + (i / (data.length - 1)) * (w - px * 2),
    y: py + (1 - (d.score - minS) / (maxS - minS)) * (h - py * 2),
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) * 0.4;
    const cp2x = points[i].x - (points[i].x - points[i - 1].x) * 0.4;
    d += ` C ${cp1x} ${points[i - 1].y}, ${cp2x} ${points[i].y}, ${points[i].x} ${points[i].y}`;
  }

  const avgY = py + (1 - (avg - minS) / (maxS - minS)) * (h - py * 2);

  return (
    <div className="chart-container">
      <svg width="100%" height={h + 16} viewBox={`0 0 ${w} ${h + 16}`}>
        <line x1={px} y1={avgY} x2={w - px} y2={avgY} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
        <text x={w - px} y={avgY - 4} textAnchor="end" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="500">avg</text>
        <path d={d} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="rgba(255,255,255,0.3)" />
        ))}
        {data.map((dd, i) => (
          i % 2 === 0 && (
            <text key={i} x={points[i].x} y={h + 12} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="Inter, sans-serif">
              {dd.date}
            </text>
          )
        ))}
      </svg>
    </div>
  );
}

function Constellation() {
  return (
    <div className="constellation-field">
      {constellationDots.map((dot, i) => (
        <div
          key={i}
          className="constellation-dot"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.bright ? 5 : 3,
            height: dot.bright ? 5 : 3,
            background: dot.bright ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.15)',
            animationDelay: `${200 + Math.random() * 800}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function FriendDetail({ friend, onBack }) {
  const staggered = useStaggeredMount(6, 100, 80);

  return (
    <div className="screen-container">
      <button className="back-btn" onClick={onBack}>← Today</button>

      <div className={`stagger-item ${staggered > 0 ? 'visible' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden' }}>
          <Genmoji expression="warm" size={48} />
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{friend.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-tertiary)', fontWeight: 500 }}>{friend.tag}</div>
        </div>
      </div>

      <div className={`stagger-item ${staggered > 1 ? 'visible' : ''}`}>
        <ScoreRing
          value={friend.resonance}
          max={1}
          size={120}
          strokeWidth={1.5}
          fontSize={48}
          label="RESONANCE"
          sublabel="Past 30 days"
          delay={200}
        />
      </div>

      <div className={`stagger-item ${staggered > 2 ? 'visible' : ''}`} style={{ marginTop: 16 }}>
        <FriendTrendChart data={scoreTrend} />
      </div>

      <div className="divider" />

      <div className={`stagger-item ${staggered > 3 ? 'visible' : ''}`}>
        <div className="section-label">ACCUMULATED CONTACT</div>
        <Constellation />
      </div>

      <div className={`stagger-item ${staggered > 4 ? 'visible' : ''}`}>
        <InsightCard text={friendInsight} />
      </div>

      <div className={`longitudinal-row stagger-item ${staggered > 5 ? 'visible' : ''}`}>
        <div className="longitudinal-card">
          <div className="longitudinal-label">DRIFT</div>
          <div className="longitudinal-value">Converging</div>
        </div>
        <div className="longitudinal-card">
          <div className="longitudinal-label">AVG SESSION</div>
          <div className="longitudinal-value">28 min</div>
        </div>
        <div className="longitudinal-card">
          <div className="longitudinal-label">CONTACT RATE</div>
          <div className="longitudinal-value">6.2</div>
        </div>
      </div>
    </div>
  );
}
