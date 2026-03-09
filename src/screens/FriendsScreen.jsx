import { friends } from '../data';
import { useStaggeredMount } from '../hooks';
import Genmoji from '../components/Genmoji';

const FRIEND_EXPRESSIONS = ['warm', 'neutral', 'playful', 'guarded', 'distant'];

export default function FriendsScreen({ onFriendTap }) {
  const staggered = useStaggeredMount(friends.length + 1, 100, 80);

  return (
    <div className="screen-container">
      <div className="date-header">Network</div>
      <div className="screen-title">Friends</div>
      <div className="screen-subtitle">{friends.length} connections</div>

      <div className="friends-list">
        {friends.map((friend, idx) => (
          <div
            key={friend.id}
            className={`friend-list-row stagger-item ${staggered > idx ? 'visible' : ''}`}
            style={{ animationDelay: `${idx * 80}ms` }}
            onClick={() => onFriendTap(friend)}
          >
            <div className="friend-list-avatar">
              <Genmoji expression={FRIEND_EXPRESSIONS[idx % FRIEND_EXPRESSIONS.length]} size={44} />
            </div>
            <div className="friend-list-info">
              <div className="friend-list-name">{friend.name}</div>
              <div className="friend-list-tag">{friend.tag} · {friend.convos} sessions</div>
              <div className="friend-list-last">Last: {friend.lastSession}</div>
            </div>
            <div className="friend-list-score">
              <div className="friend-list-score-value">{(friend.resonance * 100).toFixed(0)}</div>
              <div className="friend-list-score-label">Resonance</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
