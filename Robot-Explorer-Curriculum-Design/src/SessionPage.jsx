// Session page — content shared between mobile and desktop layouts.
// "layout" prop switches between 'mobile' (single column, sticky bar,
// collapsed segments) and 'desktop' (sidebar + content + aside).

const { Icons: I, BarcodeSVG: BC, useLocal: useLS } = window;

// ── At-a-glance strip ───────────────────────────────────────
function GlanceStrip({ items }) {
  const iconMap = {
    clock: I.clock, "graduation-cap": I.grad, blocks: I.blocks,
    laptop: I.laptop, "clipboard-check": I.clipboard, "list-ordered": I.list,
  };
  return (
    <ul className="glance-strip">
      {items.map((it) => (
        <li key={it.label} className="glance-item">
          <div className="glance-label">{it.label}</div>
          <div className="glance-value">{it.value}</div>
        </li>
      ))}
    </ul>
  );
}

// ── Run sheet ───────────────────────────────────────────────
function RunSegment({ seg, open, onToggle }) {
  return (
    <article className={`segment ${open ? 'open' : ''}`}>
      <button className="segment-header" onClick={onToggle} aria-expanded={open}>
        <div className="segment-rail">
          <span className="time">{seg.time}</span>
          <span className="dur">{seg.duration}</span>
        </div>
        <div className="segment-body">
          <div className="segment-name">{seg.name}</div>
          <div className="segment-cue">{seg.cue}</div>
        </div>
        <div className="segment-chev">{I.chevronDown}</div>
      </button>
      {open && (
        <div className="segment-detail">
          <span className="segment-loop">{seg.loop}</span>

          <h4>Steps</h4>
          <ol>{seg.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>

          {seg.say && seg.say.length > 0 && (
            <>
              <h4>Say or demonstrate</h4>
              <div className="segment-say">
                {seg.say.map((s, i) => <p key={i}>{s}</p>)}
              </div>
            </>
          )}

          {seg.watchFor && seg.watchFor.length > 0 && (
            <div className="minicallout mc-watch">
              <span className="minicallout-icon">{I.eye}</span>
              <div className="minicallout-body">
                <strong>Watch for</strong>
                <ul>{seg.watchFor.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            </div>
          )}
          {seg.earlyFinish && (
            <div className="minicallout mc-early">
              <span className="minicallout-icon">{I.check}</span>
              <div className="minicallout-body">
                <strong>If they finish early</strong>
                <div>{seg.earlyFinish}</div>
              </div>
            </div>
          )}
          {seg.stuck && (
            <div className="minicallout mc-stuck">
              <span className="minicallout-icon">{I.warn}</span>
              <div className="minicallout-body">
                <strong>If they're stuck</strong>
                <div>{seg.stuck}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function RunSheet({ segments, defaultOpen, storageKey }) {
  // openMap[id] = bool. Initialised once from defaultOpen + storage.
  const init = useMemo(() => {
    const m = {};
    segments.forEach((s, i) => { m[s.id] = defaultOpen === 'all' || (defaultOpen === 'first' && i === 0); });
    return m;
  }, [segments, defaultOpen]);
  const [openMap, setOpenMap] = useLS(storageKey || 'rs-open', init);
  return (
    <div className="runsheet">
      {segments.map((s) => (
        <RunSegment key={s.id} seg={s}
          open={!!openMap[s.id]}
          onToggle={() => setOpenMap({ ...openMap, [s.id]: !openMap[s.id] })} />
      ))}
    </div>
  );
}

// ── Materials checklist ─────────────────────────────────────
function MaterialsList({ materials, storageKey }) {
  const [checked, setChecked] = useLS(storageKey || 'mat-check', {});
  const toggle = (k) => setChecked({ ...checked, [k]: !checked[k] });

  const renderGroup = (label, items, prefix) => (
    <div className="materials-group" key={label}>
      <h3>{label}</h3>
      <ul className="mat-list">
        {items.map((m) => {
          const key = `${prefix}-${m.name}`;
          const on = !!checked[key];
          return (
            <li key={key} className={`mat-row ${on ? 'checked' : ''}`}>
              <button className={`mat-check ${on ? 'on' : ''}`} onClick={() => toggle(key)} aria-label={on ? 'Uncheck' : 'Check'}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
              </button>
              <span className="mat-name">{m.name}</span>
              <span className="mat-meta">{m.qty}</span>
              {m.pdf && <a className="mat-pdf" href={m.pdf}>PDF →</a>}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div>
      {renderGroup('Robots & physical', materials.physical, 'p')}
      {materials.devices && renderGroup('Devices', materials.devices, 'd')}
    </div>
  );
}

// ── Session barcodes block (TEXT-ONLY) ──────────────────────
// Edison robots cannot scan barcodes from a phone or laptop screen.
// They must sit on a printed barcode sheet. So in-page we just NAME
// the barcodes used in this session and link out to the printable PDF.
function SessionBarcodes({ barcodes, onOpenResources }) {
  if (!barcodes || barcodes.length === 0) {
    return (
      <div className="spec-note" style={{ padding: '12px 14px', background: 'var(--color-bg-subtle)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
        No barcodes needed in this session — turns are programmed entirely in EdBlocks.
      </div>
    );
  }
  return (
    <div>
      <ul className="bc-session-list">
        {barcodes.map((b) => (
          <li key={b.id} className="bc-session-row">
            <span className="bc-session-tag">BC</span>
            <div className="bc-session-body">
              <div className="bc-session-name">{b.name}</div>
              <div className="bc-session-where">{b.where}</div>
              <div className="bc-session-role">{b.role}</div>
            </div>
          </li>
        ))}
      </ul>
      <p className="bc-session-foot">
        Edison scans barcodes from paper only — placing the robot directly
        on top of the printed bars.{' '}
        {onOpenResources
          ? <a href="#" onClick={(e) => { e.preventDefault(); onOpenResources(); }}>Open printable barcode sheet →</a>
          : <a href="#">Open printable barcode sheet →</a>}
      </p>
    </div>
  );
}

// ── Engineering connection ──────────────────────────────────
function Engineering({ data }) {
  return (
    <div className="engineering-block">
      <div className="step-pill">Step: {data.step}</div>
      <p>{data.body}</p>
    </div>
  );
}

// ── Troubleshooting ─────────────────────────────────────────
function TroubleItem({ item, open, onToggle }) {
  return (
    <article className={`trouble-item ${open ? 'open' : ''}`}>
      <button className="trouble-head" onClick={onToggle} aria-expanded={open}>
        <span className="trouble-icon" aria-hidden="true">!</span>
        <span className="trouble-symptom">{item.symptom}</span>
        <span className="trouble-chev">{I.chevronDown}</span>
      </button>
      {open && (
        <dl className="trouble-detail">
          <dt>Likely cause</dt>
          <dd>{item.cause}</dd>
          <dt>Fix</dt>
          <dd>{item.fix}</dd>
        </dl>
      )}
    </article>
  );
}

function TroubleList({ items, storageKey, defaultOpen }) {
  const init = useMemo(() => {
    const m = {};
    items.forEach((it, i) => { m[it.id] = defaultOpen === 'all' || (defaultOpen === 'first' && i === 0); });
    return m;
  }, [items, defaultOpen]);
  const [openMap, setOpenMap] = useLS(storageKey || 'tr-open', init);
  return (
    <div className="trouble-list">
      {items.map((it) => (
        <TroubleItem key={it.id} item={it}
          open={!!openMap[it.id]}
          onToggle={() => setOpenMap({ ...openMap, [it.id]: !openMap[it.id] })} />
      ))}
    </div>
  );
}

// ── Prev / Next ─────────────────────────────────────────────
function PrevNext({ prev, next }) {
  return (
    <nav className="prevnext" aria-label="Session navigation">
      <a className={prev ? '' : 'disabled'} href={prev ? `#${prev.slug}` : '#'}>
        <div className="pn-label">← Session {prev?.number}</div>
        <div className="pn-title">{prev ? prev.title : '—'}</div>
      </a>
      <a className={next ? 'next' : 'next disabled'} href={next ? `#${next.slug}` : '#'}>
        <div className="pn-label">Session {next?.number} →</div>
        <div className="pn-title">{next ? next.title : '—'}</div>
      </a>
    </nav>
  );
}

// ── Sticky header ───────────────────────────────────────────
function StickyHeader({ session, onOpenResources, activeJump, onJump, compact }) {
  const jumps = ['Overview', 'Run sheet', 'Materials', 'Troubleshooting'];
  return (
    <header className="session-sticky" style={compact ? { padding: 0 } : {}}>
      <div className="session-sticky-row">
        <div className="session-sticky-pos">
          <span className="pos-class">{session.semester.code} · Sess {session.number}</span>
          {session.title}
        </div>
        <button className="btn-resources" onClick={onOpenResources}>
          <span className="btn-resources-icon">{I.clipboard}</span>
          Resources
        </button>
      </div>
      {!compact && (
        <div className="jump-row">
          {jumps.map((j) => (
            <button key={j} className={`jump-chip ${activeJump === j ? 'active' : ''}`}
                    onClick={() => onJump && onJump(j)}>{j}</button>
          ))}
        </div>
      )}
    </header>
  );
}

// ── Session header block ────────────────────────────────────
function SessionHeader({ session }) {
  return (
    <section className="session-header" data-jump="Overview">
      <span className="eyebrow">
        <span>Robot Explorers</span>
        <span className="pos">· {session.semester.code} {session.semester.title}</span>
      </span>
      <h1 className="session-title">{session.title}</h1>
      <div className="session-position">Session {session.number} of {session.total}</div>
      <p className="session-summary">{session.summary}</p>
      <GlanceStrip items={session.glance} />
    </section>
  );
}

function OpeningConcept({ text }) {
  return (
    <aside className="opening-block">
      <div className="opening-eyebrow">Opening concept</div>
      <p className="opening-text">{text}</p>
    </aside>
  );
}

// ── Mobile session page ─────────────────────────────────────
function MobileSessionPage({ session, onOpenResources, storagePrefix = 'm' }) {
  const [activeJump, setActiveJump] = useState('Overview');
  const scrollerRef = useRef(null);

  const jumpTo = (name) => {
    setActiveJump(name);
    const el = scrollerRef.current?.querySelector(`[data-jump="${name}"]`);
    if (el && scrollerRef.current) {
      scrollerRef.current.scrollTo({ top: el.offsetTop - 110, behavior: 'smooth' });
    }
  };

  return (
    <div ref={scrollerRef} className="session-page" style={{ height: '100%', overflowY: 'auto', position: 'relative' }}>
      <StickyHeader session={session} onOpenResources={onOpenResources}
                    activeJump={activeJump} onJump={jumpTo} />
      <SessionHeader session={session} />
      <OpeningConcept text={session.opening} />

      <section className="section-block" data-jump="Run sheet">
        <div className="section-head">
          <h2>Run sheet</h2>
          <span className="section-meta">Tap a segment to expand</span>
        </div>
        <RunSheet segments={session.segments} defaultOpen="first" storageKey={`${storagePrefix}-rs`} />
      </section>

      <section className="section-block" data-jump="Materials">
        <div className="section-head">
          <h2>Materials</h2>
          <span className="section-meta">Tick as you set up</span>
        </div>
        <MaterialsList materials={session.materials} storageKey={`${storagePrefix}-mat`} />
      </section>

      <section className="section-block">
        <div className="section-head">
          <h2>Barcodes for this session</h2>
          <span className="section-meta">{session.sessionBarcodes.length} · from printed sheet</span>
        </div>
        <SessionBarcodes barcodes={session.sessionBarcodes} onOpenResources={onOpenResources} />
      </section>

      <section className="section-block">
        <div className="section-head">
          <h2>Engineering connection</h2>
        </div>
        <Engineering data={session.engineering} />
      </section>

      <section className="section-block" data-jump="Troubleshooting">
        <div className="section-head">
          <h2>Troubleshooting</h2>
          <span className="section-meta">{session.troubleshooting.length} items</span>
        </div>
        <TroubleList items={session.troubleshooting} storageKey={`${storagePrefix}-tr`} defaultOpen="first" />
      </section>

      <section className="section-block">
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
  );
}

window.MobileSessionPage = MobileSessionPage;
window.RunSegment = RunSegment;
window.RunSheet = RunSheet;
window.MaterialsList = MaterialsList;
window.SessionBarcodes = SessionBarcodes;
window.Engineering = Engineering;
window.TroubleList = TroubleList;
window.TroubleItem = TroubleItem;
window.PrevNext = PrevNext;
window.GlanceStrip = GlanceStrip;
window.StickyHeader = StickyHeader;
window.SessionHeader = SessionHeader;
window.OpeningConcept = OpeningConcept;
