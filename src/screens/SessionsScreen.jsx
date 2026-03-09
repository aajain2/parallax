import { sessions } from '../data';
import { useStaggeredMount } from '../hooks';
import Genmoji, { getSessionExpressions } from '../components/Genmoji';

export default function SessionsScreen({ onSessionTap }) {
  const staggered = useStaggeredMount(sessions.length + 1, 100, 80);

  return (
    <div className="screen-container">
      <div className="date-header">History</div>
      <div className="screen-title">Sessions</div>
      <div className="screen-subtitle">{sessions.length} sessions recorded</div>

      <div className="sessions-list">
        {sessions.map((session, idx) => {
          const expressions = getSessionExpressions(session);
          return (
            <div
              key={session.id}
              className={`session-list-row stagger-item ${staggered > idx ? 'visible' : ''}`}
              style={{ animationDelay: `${idx * 80}ms` }}
              onClick={() => onSessionTap(session)}
            >
              <div className="genmoji-cluster">
                {session.people.map((p, i) => (
                  <div key={p.initial} className="genmoji-wrap">
                    <Genmoji expression={expressions[i]} size={28} />
                  </div>
                ))}
              </div>
              <div className="session-list-info">
                <div className="session-list-date">{session.date} · {session.timestamp}</div>
                <div className="session-list-people">
                  {session.people.map(p => p.name).join(', ')}
                </div>
                <div className="session-list-duration">{session.duration}</div>
              </div>
              <div>
                <div className="session-list-score">{session.overlapScore}</div>
                <div className="session-list-score-label">Score</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
