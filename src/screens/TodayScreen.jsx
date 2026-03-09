import { useEffect, useRef, useState } from 'react';
import { sessions, friends, scoreTrend } from '../data';
import { useCountUp, useStaggeredMount } from '../hooks';
import InsightCard from '../components/InsightCard';
import Genmoji, { getSessionExpressions } from '../components/Genmoji';

const EARTH_COLORS = ['#A0524A', '#8B7D3C', '#3A7D7B', '#5B7B94', '#8C6E4A'];
const FRIEND_EXPRESSIONS = ['warm', 'neutral', 'playful', 'guarded', 'distant'];


function AuraBlobs({ people, degree, size = 52 }) {
  const allBlobs = [{ label: 'You' }, ...people];
  const colors = allBlobs.map((_, i) => EARTH_COLORS[i % EARTH_COLORS.length]);
  const maxSpread = size * 1.1;
  const minSpread = size * 0.25;
  const gap = maxSpread - degree * (maxSpread - minSpread);
  return (
    <div style={{ position: 'relative', height: size + 28, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0' }}>
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
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function RealityOverlap({ degree, score, people }) {
  const animatedScore = useCountUp(score, 1200, 400);
  return (
    <div>
      <AuraBlobs people={people} degree={degree} />
      <div style={{ textAlign: 'center' }}>
        <span className="score-pill">Score: {Math.round(animatedScore)}</span>
      </div>
    </div>
  );
}

function TrendChart({ data }) {
  const pathRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const w = 320, h = 80, px = 8, py = 8;
  const minS = Math.min(...data.map(d => d.score)) - 5;
  const maxS = Math.max(...data.map(d => d.score)) + 5;

  const points = data.map((d, i) => ({
    x: px + (i / (data.length - 1)) * (w - px * 2),
    y: py + (1 - (d.score - minS) / (maxS - minS)) * (h - py * 2),
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) * 0.4;
    const cp1y = points[i - 1].y;
    const cp2x = points[i].x - (points[i].x - points[i - 1].x) * 0.4;
    const cp2y = points[i].y;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
  }

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = len;
      pathRef.current.style.strokeDashoffset = len;
      requestAnimationFrame(() => setMounted(true));
    }
  }, []);

  return (
    <div className="chart-container">
      <svg width={w} height={h + 16} viewBox={`0 0 ${w} ${h + 16}`} style={{ width: '100%', height: 'auto' }}>
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDashoffset: mounted ? 0 : undefined,
            transition: 'stroke-dashoffset 1.8s ease-in-out',
          }}
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="rgba(255,255,255,0.35)" />
        ))}
        {data.map((dd, i) => (
          i % 2 === 0 && (
            <text key={i} x={points[i].x} y={h + 12} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="Inter, sans-serif">
              {dd.date}
            </text>
          )
        ))}
      </svg>
    </div>
  );
}

export default function TodayScreen({ onSessionTap, onFriendTap }) {
  const staggered = useStaggeredMount(6, 100, 80);
  const [selectedFriend, setSelectedFriend] = useState(0);

  return (
    <div className="screen-container">
      <div className="date-header">Sunday, March 8</div>
      <div className="screen-title">Your Day</div>
      <div className="screen-subtitle">2 sessions detected</div>

      {sessions.map((session, idx) => {
        const expressions = getSessionExpressions(session);
        return (
          <div
            key={session.id}
            className={`card session-card stagger-item ${staggered > idx ? 'visible' : ''}`}
            style={{ animationDelay: `${idx * 80}ms` }}
            onClick={() => onSessionTap(session)}
          >
            <div className="session-top-row">
              <div className="genmoji-cluster">
                {session.people.map((p, i) => (
                  <div key={p.initial} className="genmoji-wrap">
                    <Genmoji expression={expressions[i]} size={28} />
                  </div>
                ))}
              </div>
              <span className="session-label">{session.label}</span>
              {session.isNew && <span className="new-badge">NEW</span>}
              <span className="session-timestamp">{session.timestamp}</span>
            </div>
            <div className="session-duration">{session.duration}</div>
            <RealityOverlap degree={session.overlapDegree} score={session.overlapScore} people={session.people} />
          </div>
        );
      })}

      <div className={`stagger-item ${staggered > 2 ? 'visible' : ''}`} style={{ animationDelay: '160ms' }}>
        <div className="trends-header">
          <span className="trends-label">Trends</span>
          <span className="trends-dropdown">Past 30 days ▾</span>
        </div>

        <div className="friend-bubbles">
          {friends.map((f, i) => (
            <button
              key={f.id}
              className={`friend-bubble ${i === selectedFriend ? 'selected' : ''}`}
              onClick={(e) => { e.stopPropagation(); setSelectedFriend(i); onFriendTap(f); }}
            >
              <div className="friend-bubble-circle">
                <Genmoji expression={FRIEND_EXPRESSIONS[i % FRIEND_EXPRESSIONS.length]} size={40} />
              </div>
              <span className="friend-bubble-label">{f.convos} convos</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`stagger-item ${staggered > 3 ? 'visible' : ''}`} style={{ animationDelay: '240ms' }}>
        <TrendChart data={scoreTrend} />
      </div>

      <div className={`stagger-item ${staggered > 4 ? 'visible' : ''}`} style={{ animationDelay: '320ms' }}>
        <InsightCard
          text="Marcus tends to be more quiet when you initiate topics about work. Consider letting him lead next time."
          onClick={() => onFriendTap(friends[0])}
        />
      </div>
    </div>
  );
}
