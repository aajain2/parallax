import { useEffect, useRef, useState } from 'react';
import { useCountUp, useStaggeredMount } from '../hooks';
import InsightCard from '../components/InsightCard';
import Genmoji from '../components/Genmoji';

const EARTH_COLORS = ['#A0524A', '#8B7D3C', '#3A7D7B', '#5B7B94', '#8C6E4A'];

function WhoopMetricRow({ label, pct, value, color, barWidth, active }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);
  return (
    <div className="metric-row">
      <div className="metric-row-top">
        <div className="metric-dot" style={{ borderColor: color }}>
          {active && <div className="metric-dot-inner" style={{ background: color }} />}
        </div>
        <span className="metric-row-label">{label}</span>
        {pct !== undefined && <span className="metric-row-pct">{pct}%</span>}
        <span className="metric-row-value">{value}</span>
      </div>
      <div className="metric-bar-track">
        <div
          className="metric-bar-fill"
          style={{ width: mounted ? `${barWidth}%` : '0%', background: color }}
        />
      </div>
    </div>
  );
}

function TimelineSegments({ segments }) {
  const w = 180, h = 24;
  const segW = w / segments.length;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {segments.map((val, i) => {
        const barH = 6 + val * 16;
        const opacity = 0.15 + val * 0.5;
        return (
          <rect
            key={i}
            x={i * segW + 1}
            y={(h - barH) / 2}
            width={segW - 2}
            height={barH}
            rx={barH / 2}
            fill={`rgba(255,255,255,${opacity})`}
          />
        );
      })}
    </svg>
  );
}

function ResonanceArc({ you, friend1 }) {
  const w = 300, h = 64;
  const toPath = (data) => {
    const points = data.map((v, i) => ({
      x: (i / (data.length - 1)) * w,
      y: h - v * h * 0.85 - 4,
    }));
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cpx1 = points[i - 1].x + (points[i].x - points[i - 1].x) * 0.4;
      const cpx2 = points[i].x - (points[i].x - points[i - 1].x) * 0.4;
      d += ` C ${cpx1} ${points[i - 1].y}, ${cpx2} ${points[i].y}, ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <path d={toPath(you)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <path d={toPath(friend1)} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
    </svg>
  );
}

export default function SessionDetail({ session, onBack, onMomentTap }) {
  const staggered = useStaggeredMount(8, 100, 80);
  const mrAnimated = useCountUp(session.mutualRecognizance, 1800, 200);

  const people = session.people;
  const tl = session.timeline;

  return (
    <div className="screen-container">
      <button className="back-btn" onClick={onBack}>← Today</button>

      <div className={`stagger-item ${staggered > 0 ? 'visible' : ''}`}>
        <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 2 }}>
          With {people.map(p => p.name).join(', ')}
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20 }}>
          Today · {session.duration.split(' ').slice(0, 2).join(' ')}
        </div>
      </div>

      {/* Mutual Recognizance — aura blobs */}
      <div className={`card-elevated mr-card stagger-item ${staggered > 1 ? 'visible' : ''}`}>
        {(() => {
          const allBlobs = [{ label: 'You' }, ...people];
          const colors = allBlobs.map((_, i) => EARTH_COLORS[i % EARTH_COLORS.length]);
          const size = 68;
          const maxSpread = size * 1.1;
          const minSpread = size * 0.25;
          const gap = maxSpread - session.mutualRecognizance * (maxSpread - minSpread);
          return (
            <div style={{ position: 'relative', height: size + 36, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              {colors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    background: c,
                    opacity: 0.55,
                    filter: `blur(${Math.round(size * 0.3)}px)`,
                    left: `calc(50% - ${size / 2}px + ${(i - (allBlobs.length - 1) / 2) * gap}px)`,
                    animation: 'breathe 3s infinite ease-in-out',
                    animationDelay: `${i * 1.5}s`,
                  }}
                />
              ))}
            </div>
          );
        })()}
        <div className="mr-score">{mrAnimated.toFixed(2)}</div>
        <div className="mr-label">MUTUAL RECOGNIZANCE</div>
        <div className="mr-sublabel">{session.recognizanceLabel}</div>
      </div>

      {/* Whoop-style Metric Breakdown */}
      <div className={`stagger-item ${staggered > 2 ? 'visible' : ''}`}>
        <div className="metric-section">
          <div className="metric-section-header">
            <div className="metric-section-title">Felt Time</div>
            <div className="metric-section-value">{session.duration.split(' ').slice(0, 2).join(' ')}</div>
          </div>

          <WhoopMetricRow
            label="YOU"
            pct={session.yourMetrics.authorship}
            value={tl.you.feltTime}
            color="rgba(255,255,255,0.6)"
            barWidth={session.yourMetrics.authorship}
            active={true}
          />
          <WhoopMetricRow
            label={people[0]?.name.toUpperCase()}
            pct={session.friendMetrics.authorship}
            value={tl.friend1.feltTime}
            color="rgba(255,255,255,0.35)"
            barWidth={session.friendMetrics.authorship}
            active={false}
          />
          {tl.friend2 && people[1] && (
            <WhoopMetricRow
              label={people[1].name.toUpperCase()}
              value={tl.friend2.feltTime}
              color="rgba(255,255,255,0.25)"
              barWidth={30}
              active={false}
            />
          )}
        </div>
      </div>

      {/* Timeline with POI dots */}
      <div className={`timeline-section stagger-item ${staggered > 3 ? 'visible' : ''}`}>
        <div className="section-label">SESSION TIMELINE</div>
        <div className="timeline-row">
          <div className="timeline-avatar">
            <Genmoji expression="neutral" size={24} />
          </div>
          <span className="timeline-name">You</span>
          <div className="timeline-bar">
            <TimelineSegments segments={tl.you.segments} />
            {session.pointsOfInterest.map((pos, i) => (
              <div
                key={i}
                className="poi-dot"
                style={{ left: `${pos * 100}%` }}
                onClick={(e) => { e.stopPropagation(); onMomentTap(i); }}
              />
            ))}
          </div>
          <span className="timeline-felt">{tl.you.feltTime}</span>
        </div>

        <div className="timeline-row">
          <div className="timeline-avatar">
            <Genmoji expression="warm" size={24} />
          </div>
          <span className="timeline-name">{people[0]?.name}</span>
          <div className="timeline-bar">
            <TimelineSegments segments={tl.friend1.segments} />
          </div>
          <span className="timeline-felt">{tl.friend1.feltTime}</span>
        </div>

        {tl.friend2 && people[1] && (
          <div className="timeline-row">
            <div className="timeline-avatar">
              <Genmoji expression="playful" size={24} />
            </div>
            <span className="timeline-name">{people[1]?.name}</span>
            <div className="timeline-bar">
              <TimelineSegments segments={tl.friend2.segments} />
            </div>
            <span className="timeline-felt">{tl.friend2.feltTime}</span>
          </div>
        )}
      </div>

      {/* Resonance Arc */}
      <div className={`stagger-item ${staggered > 4 ? 'visible' : ''}`}>
        <div className="section-label">RESONANCE ARC</div>
        <ResonanceArc you={session.resonanceArc.you} friend1={session.resonanceArc.friend1} />
      </div>

      <div className="divider" />

      {/* Whoop-style per-person stats */}
      <div className={`stagger-item ${staggered > 5 ? 'visible' : ''}`}>
        <div className="metric-section">
          <div className="metric-section-header">
            <div className="metric-section-title">Your Metrics</div>
          </div>
          <WhoopMetricRow label="AUTHORSHIP" pct={session.yourMetrics.authorship} value={`${session.yourMetrics.authorship}%`} color="rgba(255,255,255,0.5)" barWidth={session.yourMetrics.authorship} active={true} />
          <WhoopMetricRow label="HRV TREND" value={session.yourMetrics.hrvTrend === 'up' ? '↑ Up' : session.yourMetrics.hrvTrend === 'down' ? '↓ Down' : '→ Stable'} color="var(--teal)" barWidth={65} active={false} />
          <WhoopMetricRow label="SUPPRESSION" value={session.yourMetrics.suppression} color="var(--earth-steel)" barWidth={session.yourMetrics.suppression === 'low' ? 20 : 55} active={false} />
        </div>
      </div>

      <div className={`stagger-item ${staggered > 6 ? 'visible' : ''}`}>
        <div className="metric-section">
          <div className="metric-section-header">
            <div className="metric-section-title">{people[0]?.name}'s Metrics</div>
          </div>
          <WhoopMetricRow label="AUTHORSHIP" pct={session.friendMetrics.authorship} value={`${session.friendMetrics.authorship}%`} color="rgba(255,255,255,0.5)" barWidth={session.friendMetrics.authorship} active={true} />
          <WhoopMetricRow label="HRV" value={session.friendMetrics.hrv || '—'} color="var(--earth-steel)" barWidth={0} active={false} />
          <WhoopMetricRow label="UNSAID SIGNAL" value={session.friendMetrics.unsaid} color={session.friendMetrics.unsaid === 'moderate' ? 'var(--yellow)' : 'var(--earth-steel)'} barWidth={session.friendMetrics.unsaid === 'moderate' ? 50 : 20} active={false} />
        </div>
      </div>

      {/* Insights */}
      <div className={`stagger-item ${staggered > 7 ? 'visible' : ''}`}>
        <div className="section-label">INSIGHTS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {session.insights.map((text, i) => (
            <InsightCard key={i} text={text} label={i === 0 ? 'INSIGHT' : 'OBSERVATION'} />
          ))}
        </div>
      </div>
    </div>
  );
}
