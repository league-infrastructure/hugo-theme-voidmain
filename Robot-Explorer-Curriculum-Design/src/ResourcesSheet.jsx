// Resources sheet — bottom-sheet overlay reachable from the sticky
// header's "Resources" button. Lists the printable PDFs and links
// the instructor might want one tap away during class.
//
// Notes:
//  Edison barcodes can't be scanned from a phone or laptop screen —
//  the robot has to sit ON the paper. So this sheet links to the
//  printable barcode PDF rather than rendering bars onscreen.

const { Icons: RSi } = window;

function ResourcesSheet({ open, onClose, resources, sessionBarcodes }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  return (
    <div className={`bc-overlay ${open ? 'on' : ''}`} onClick={onClose}>
      <div className="bc-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="bc-handle" />
        <div className="bc-header">
          <h2>Resources for this session</h2>
          <button className="bc-close" onClick={onClose} aria-label="Close">{RSi.x}</button>
        </div>

        <div className="bc-body">
          <div className="bc-group-label">Printable & web</div>
          <ul className="res-list">
            {resources.map((r) => (
              <li key={r.id} className="res-row">
                <a className="res-link" href={r.href} target="_blank" rel="noopener noreferrer">
                  <div className="res-icon" aria-hidden="true">
                    {r.type === 'PDF' ? <span className="res-tag">PDF</span> : <span className="res-tag res-tag-link">LINK</span>}
                  </div>
                  <div className="res-body">
                    <div className="res-name">{r.name}</div>
                    <div className="res-note">{r.note}</div>
                  </div>
                  <div className="res-arrow">↗</div>
                </a>
              </li>
            ))}
          </ul>

          {sessionBarcodes && sessionBarcodes.length > 0 && (
            <>
              <div className="bc-group-label">Barcodes you may need from the printed sheet</div>
              <ul className="res-list">
                {sessionBarcodes.map((b) => (
                  <li key={b.id} className="res-row res-row-static">
                    <div className="res-icon" aria-hidden="true">
                      <span className="res-tag res-tag-bc">BC</span>
                    </div>
                    <div className="res-body">
                      <div className="res-name">{b.name}</div>
                      <div className="res-note">{b.where} · {b.role}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div style={{ padding: '14px 4px 0', fontSize: 12, color: 'var(--color-fg-muted)', lineHeight: 1.5 }}>
            Edison robots scan barcodes from paper only — placing the
            robot directly on top of the printed bars. They can't read
            barcodes from a phone or laptop screen.
          </div>
        </div>
      </div>
    </div>
  );
}

window.ResourcesSheet = ResourcesSheet;
