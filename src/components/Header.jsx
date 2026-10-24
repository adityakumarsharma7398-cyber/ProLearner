const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'map', label: 'Knowledge Map' },
  { id: 'journey', label: 'Progress Journey' },
]

export default function Header({ view, onNavigate }) {
  return (
    <header className="site-header">
      <div className="container">
        <button className="logo" onClick={() => onNavigate('dashboard')} aria-label="ProLearner home">
          <span className="logo__mark" aria-hidden="true">P</span>
          ProLearner
        </button>
        <nav className="nav" aria-label="Main">
          {TABS.map((t) => (
            <button key={t.id} aria-current={view === t.id ? 'page' : undefined} onClick={() => onNavigate(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
