export default function BottomNav({ active, onNavigate }) {
  const items = [
    { id: 'today', label: 'Today', icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
    )},
    { id: 'sessions', label: 'Sessions', icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M9 4v4" /><path d="M15 4v4" /></svg>
    )},
    { id: 'friends', label: 'Friends', icon: (
      <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5" /><path d="M2 19c0-3.3 2.7-6 6-6h2c3.3 0 6 2.7 6 6" /><circle cx="18" cy="9" r="2.5" /><path d="M18 13c2.2 0 4 1.8 4 4" /></svg>
    )},
    { id: 'you', label: 'You', icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
    )},
  ];

  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <button
          key={item.id}
          className={`nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          {item.icon}
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
