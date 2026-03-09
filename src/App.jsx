import { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import TodayScreen from './screens/TodayScreen';
import SessionsScreen from './screens/SessionsScreen';
import SessionDetail from './screens/SessionDetail';
import MomentDetail from './screens/MomentDetail';
import FriendsScreen from './screens/FriendsScreen';
import FriendDetail from './screens/FriendDetail';
import ProfileScreen from './screens/ProfileScreen';
import { sessions } from './data';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [screen, setScreen] = useState({ name: 'today', params: {} });
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => setShowToast(true), 500);
    }, 1500);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3500);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const navigate = (name, params = {}) => {
    setScreen({ name, params });
    if (['today', 'sessions', 'friends', 'you'].includes(name)) {
      setActiveTab(name);
    }
  };

  const handleTabNav = (tab) => {
    if (tab === 'today') navigate('today');
    else if (tab === 'sessions') navigate('sessions');
    else if (tab === 'friends') navigate('friends');
    else if (tab === 'you') navigate('you');
  };

  const renderScreen = () => {
    switch (screen.name) {
      case 'today':
        return (
          <TodayScreen
            key="today"
            onSessionTap={(session) => navigate('session', { session })}
            onFriendTap={(friend) => navigate('friend', { friend })}
          />
        );
      case 'sessions':
        return (
          <SessionsScreen
            key="sessions"
            onSessionTap={(session) => navigate('session', { session, from: 'sessions' })}
          />
        );
      case 'session':
        return (
          <SessionDetail
            key="session"
            session={screen.params.session}
            onBack={() => navigate(screen.params.from || 'today')}
            onMomentTap={(idx) => navigate('moment', { momentIdx: idx, session: screen.params.session, from: screen.params.from })}
          />
        );
      case 'moment':
        return (
          <MomentDetail
            key="moment"
            onBack={() => navigate('session', { session: screen.params.session, from: screen.params.from })}
          />
        );
      case 'friends':
        return (
          <FriendsScreen
            key="friends"
            onFriendTap={(friend) => navigate('friend', { friend, from: 'friends' })}
          />
        );
      case 'friend':
        return (
          <FriendDetail
            key="friend"
            friend={screen.params.friend}
            onBack={() => navigate(screen.params.from || 'today')}
          />
        );
      case 'you':
        return <ProfileScreen key="you" />;
      default:
        return <TodayScreen onSessionTap={() => {}} onFriendTap={() => {}} />;
    }
  };

  return (
    <div className="device-frame">
      {showSplash && (
        <div className="splash">
          <div className="splash-text">PARALLAX</div>
        </div>
      )}

      {showToast && (
        <div className="toast" onClick={() => { setShowToast(false); navigate('session', { session: sessions[0] }); }}>
          Session detected with Marcus · 31 min · Tap to review →
        </div>
      )}

      {renderScreen()}

      <BottomNav active={activeTab} onNavigate={handleTabNav} />
    </div>
  );
}

export default App;
