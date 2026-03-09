import { useEffect, useState } from 'react';
import ScoreRing from '../components/ScoreRing';
import Genmoji from '../components/Genmoji';
import { userProfile } from '../data';
import { useStaggeredMount } from '../hooks';

function SignatureBlob() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const animate = (now) => {
      setPhase(((now - start) / 4000) % (Math.PI * 2));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const r = 36;
  const pts = 8;
  const d = Array.from({ length: pts }, (_, i) => {
    const angle = (i / pts) * Math.PI * 2;
    const wobble = Math.sin(phase + i * 0.8) * 5;
    return { x: 60 + (r + wobble) * Math.cos(angle), y: 46 + (r + wobble) * Math.sin(angle) };
  });

  let path = `M ${d[0].x} ${d[0].y}`;
  for (let i = 0; i < d.length; i++) {
    const next = d[(i + 1) % d.length];
    const cp1x = d[i].x + (next.x - d[i].x) * 0.5 + Math.sin(phase + i) * 3;
    const cp1y = d[i].y + (next.y - d[i].y) * 0.3;
    const cp2x = next.x - (next.x - d[i].x) * 0.3;
    const cp2y = next.y - (next.y - d[i].y) * 0.5 + Math.cos(phase + i) * 3;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return (
    <svg width="120" height="92" viewBox="0 0 120 92" style={{ display: 'block', margin: '12px auto' }}>
      <path d={path} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    </svg>
  );
}

function Sparkline({ data, width = 60, height = 18 }) {
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - v * height * 0.8 - 2}`).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block', marginTop: 6 }}>
      <polyline points={points} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ProfileScreen() {
  const staggered = useStaggeredMount(5, 100, 80);

  return (
    <div className="screen-container">
      <div style={{ paddingTop: 20 }} />

      <div className={`stagger-item ${staggered > 0 ? 'visible' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden' }}>
          <Genmoji expression="warm" size={52} />
        </div>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{userProfile.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Your physiological profile</div>
        </div>
      </div>

      <div className={`stagger-item ${staggered > 1 ? 'visible' : ''}`}>
        <ScoreRing
          value={userProfile.overallResonance}
          max={100}
          size={140}
          strokeWidth={1.5}
          fontSize={56}
          label="OVERALL RESONANCE"
          sublabel={userProfile.percentile}
          displayValue={(v) => Math.round(v).toString()}
          delay={200}
        />
      </div>

      <div className={`profile-grid stagger-item ${staggered > 2 ? 'visible' : ''}`}>
        <div className="profile-stat-card">
          <div className="profile-stat-label">HRV BASELINE</div>
          <div className="profile-stat-value">{userProfile.hrvBaseline}</div>
          <Sparkline data={[0.4, 0.5, 0.45, 0.55, 0.6, 0.58, 0.62]} />
        </div>
        <div className="profile-stat-card">
          <div className="profile-stat-label">AVG FELT TIME</div>
          <div className="profile-stat-value">{userProfile.avgFeltTime}</div>
          <div className="profile-stat-sub">vs {userProfile.avgRealTime} real</div>
        </div>
        <div className="profile-stat-card">
          <div className="profile-stat-label">AUTHORSHIP AVG</div>
          <div className="profile-stat-value">{userProfile.authorshipAvg}</div>
          <div className="profile-stat-sub">{userProfile.authorshipLabel}</div>
        </div>
        <div className="profile-stat-card">
          <div className="profile-stat-label">SESSIONS THIS MONTH</div>
          <div className="profile-stat-value">{userProfile.sessionsThisMonth}</div>
        </div>
      </div>

      <div className="divider" />

      <div className={`stagger-item ${staggered > 3 ? 'visible' : ''}`}>
        <div className="section-label">YOUR RELATIONAL SIGNATURE</div>
        <div className="signature-card">
          <div className="signature-text">{userProfile.signature}</div>
          <SignatureBlob />
        </div>
      </div>
    </div>
  );
}
