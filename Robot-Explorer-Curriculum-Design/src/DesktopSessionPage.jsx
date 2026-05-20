// Desktop session page — same content, two-column shape:
// left sidebar (course nav), main content (run sheet expanded by default),
// right aside (materials, session barcodes, engineering connection).

const { Icons: DI, RobotMark: DRobotMark } = window;

function DesktopSidebar({ session }) {
  const sessions = window.SEMESTER_SESSIONS;
  const semesters = window.ALL_SEMESTERS;
  return (
    <nav className="desktop-nav">
      <a href="#" className="nav-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
        <span className="nav-brand-mark"><DRobotMark size={22} /></span>
        <span>
          <div className="nav-brand-name">Robot Explorers</div>
          <div className="nav-brand-sub">Instructor guide</div>
        </span>
      </a>

      {semesters.map((sem) => (
        sem.current ? (
          <React.Fragment key={sem.code}>
            <div className="nav-group-label">{sem.code} · {sem.title}</div>
            <ul className="nav-list">
              {sessions.map((s, i) => (
                <li key={s}>
                  <a className={`nav-item ${i === session.number - 1 ? 'current' : ''}`} href="#">
                    {String(i + 1).padStart(2, '0')} · {s}
                  </a>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ) : (
          <React.Fragment key={sem.code}>
            <div className="nav-group-label">{sem.code} · {sem.title}</div>
            <ul className="nav-list">
              <li><a className="nav-item" href="#">▸ 8 sessions · {sem.level}</a></li>
            </ul>
          </React.Fragment>
        )
      ))}
    </nav>
  );
}

function DesktopSessionPage({ session, onOpenResources, storagePrefix = 'd' }) {
  const [activeJump, setActiveJump] = useState('Run sheet');
  const mainRef = useRef(null);

  const jumps = ['Overview', 'Run sheet', 'Materials', 'Troubleshooting'];
  const jumpTo = (name) => {
    setActiveJump(name);
    const el = mainRef.current?.querySelector(`[data-jump="${name}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="desktop-shell">
      <DesktopSidebar session={session} />
      <div ref={mainRef} className="main-scroller" style={{ overflowY: 'auto', height: '100%', position: 'relative' }}>
        <header className="desktop-sticky">
          <div className="pos">
            <span className="pos-class">{session.semester.code} · Session {session.number}</span>
            {session.title}
          </div>
          <div className="desktop-jump">
            {jumps.map((j) => (
              <button key={j} className={`jump-chip ${activeJump === j ? 'active' : ''}`}
                      onClick={() => jumpTo(j)}>{j}</button>
            ))}
          </div>
          <button className="btn-resources" onClick={onOpenResources}>
            <span className="btn-resources-icon">{DI.clipboard}</span>
            Resources
          </button>
        </header>

        <div className="desktop-main">
          <div>
            <section data-jump="Overview" className="desktop-overview" style={{ paddingTop: 14 }}>
              <span className="eyebrow"><span>Robot Explorers</span><span style={{ color: 'var(--color-fg-muted)', letterSpacing: '0.12em' }}> · {session.semester.code} {session.semester.title}</span></span>
              <h1 className="session-title" style={{ fontSize: 36 }}>{session.title}</h1>
              <div className="session-position">Session {session.number} of {session.total}</div>
              <p className="session-summary" style={{ fontSize: 18, maxWidth: 640 }}>{session.summary}</p>
              <GlanceStrip items={session.glance} />
              <OpeningConcept text={session.opening} />
            </section>

            <section data-jump="Run sheet" style={{ marginTop: 24 }}>
              <div className="section-head" style={{ padding: 0 }}>
                <h2 style={{ fontSize: 22 }}>Run sheet</h2>
                <span className="section-meta">All segments expanded · click to collapse</span>
              </div>
              <RunSheet segments={session.segments} defaultOpen="all" storageKey={`${storagePrefix}-rs`} />
            </section>

            <section data-jump="Troubleshooting" style={{ marginTop: 32 }}>
              <div className="section-head" style={{ padding: 0 }}>
                <h2 style={{ fontSize: 22 }}>Troubleshooting</h2>
                <span className="section-meta">{session.troubleshooting.length} items · click to expand</span>
              </div>
              <TroubleList items={session.troubleshooting} storageKey={`${storagePrefix}-tr`} defaultOpen="all" />
            </section>

            <section style={{ marginTop: 32 }}>
              <PrevNext prev={session.prev} next={session.next} />
              <footer className="session-footer">
                <span className="footer-brand">Robot Explorers · The League of Amazing Programmers</span>
                <span>
                  <a href="#">← All {session.semester.code} sessions</a>
                  <span style={{ color: 'var(--color-fg-subtle)', margin: '0 6px' }}>·</span>
                  <a href="#">Report a problem with this page</a>
                </span>
              </footer>
            </section>
          </div>

          <aside className="desktop-aside" data-jump="Materials">
            <div className="aside-card">
              <h3>Materials</h3>
              <MaterialsList materials={session.materials} storageKey={`${storagePrefix}-mat`} />
            </div>
            <div className="aside-card">
              <h3>Barcodes for this session</h3>
              <SessionBarcodes barcodes={session.sessionBarcodes} onOpenResources={onOpenResources} />
            </div>
            <div className="aside-card eng">
              <h3>Engineering connection</h3>
              <p>{session.engineering.body}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

window.DesktopSessionPage = DesktopSessionPage;
