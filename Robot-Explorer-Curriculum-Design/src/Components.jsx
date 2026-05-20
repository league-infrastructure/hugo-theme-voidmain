// Component treatments — labeled specs showing each building block.

function ComponentSpecs() {
  const session = window.SESSION;
  const dummySeg = session.segments[2]; // "EdBlocks Activity 11"
  const dummyTrouble = session.troubleshooting[0];

  return (
    <>
      {/* At-a-glance strip */}
      <div className="spec-board" style={{ width: 760 }}>
        <div>
          <div className="spec-label">Component · 01</div>
          <h2 className="spec-title">At-a-glance strip</h2>
        </div>
        <p className="spec-note">
          The session's logistical profile in a single row. On phone it
          wraps to two columns; on desktop, six. Each card is a tiny
          fact, not a label-and-value pair separated by punctuation —
          the visual rhythm matters as much as the content.
        </p>
        <GlanceStrip items={session.glance} />
      </div>

      {/* Run-sheet segment, collapsed + expanded */}
      <div className="spec-board" style={{ width: 760 }}>
        <div>
          <div className="spec-label">Component · 02</div>
          <h2 className="spec-title">Run-sheet segment</h2>
        </div>
        <p className="spec-note">
          The atomic unit of the run sheet. Left rail anchors time + duration
          in monospace (tabular numerals, easy to scan). Tap-row expands to
          the full instructor playbook: steps, language to use, watch-fors,
          early-finishers, recovery for stuck pairs.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-fg-muted)', fontWeight: 700, marginBottom: 8 }}>Collapsed (default on phone)</div>
            <RunSegment seg={dummySeg} open={false} onToggle={() => {}} />
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-fg-muted)', fontWeight: 700, marginBottom: 8 }}>Expanded (default on desktop)</div>
            <RunSegment seg={dummySeg} open={true} onToggle={() => {}} />
          </div>
        </div>
      </div>

      {/* Session-barcodes list */}
      <div className="spec-board" style={{ width: 580 }}>
        <div>
          <div className="spec-label">Component · 03</div>
          <h2 className="spec-title">Barcodes-for-this-session list</h2>
        </div>
        <p className="spec-note">
          A text-only list naming the barcodes that may come up this
          session and pointing the instructor at the printed sheet.
          We deliberately don't render scannable barcodes onscreen —
          Edison can only read barcodes from paper (it sits directly
          on top of them), so onscreen bars would mislead.
        </p>
        <SessionBarcodes barcodes={session.sessionBarcodes} onOpenResources={() => {}} />
      </div>

      {/* Troubleshooting item */}
      <div className="spec-board" style={{ width: 580 }}>
        <div>
          <div className="spec-label">Component · 04</div>
          <h2 className="spec-title">Troubleshooting item</h2>
        </div>
        <p className="spec-note">
          Symptom first — that's what the instructor sees when something
          goes wrong. Cause and fix live behind the expand. The amber
          icon is purposeful: trouble, not danger.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-fg-muted)', fontWeight: 700, marginBottom: 8 }}>Collapsed</div>
            <TroubleItem item={dummyTrouble} open={false} onToggle={() => {}} />
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-fg-muted)', fontWeight: 700, marginBottom: 8 }}>Expanded</div>
            <TroubleItem item={dummyTrouble} open={true} onToggle={() => {}} />
          </div>
        </div>
      </div>

      {/* Materials row */}
      <div className="spec-board" style={{ width: 580 }}>
        <div>
          <div className="spec-label">Component · 05</div>
          <h2 className="spec-title">Materials row</h2>
        </div>
        <p className="spec-note">
          Tap the box, the line strikes through, state lives in
          localStorage. No "save" button. No "I've got everything"
          toggle at the bottom — that's overkill. Printed items link
          to their PDF inline.
        </p>
        <ul className="mat-list" style={{ border: '1px solid var(--color-border)', borderRadius: 10, padding: '0 14px' }}>
          <li className="mat-row checked">
            <button className="mat-check on" aria-label="Uncheck">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
            </button>
            <span className="mat-name">Edison robots</span>
            <span className="mat-meta">1 per pair (≈8)</span>
          </li>
          <li className="mat-row">
            <button className="mat-check" aria-label="Check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg></button>
            <span className="mat-name">Protractor sheet (printed)</span>
            <span className="mat-meta">1 per pair</span>
            <a className="mat-pdf" href="#">PDF →</a>
          </li>
          <li className="mat-row">
            <button className="mat-check" aria-label="Check"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg></button>
            <span className="mat-name">USB-A cable (data)</span>
            <span className="mat-meta">1 per pair</span>
          </li>
        </ul>
      </div>
    </>
  );
}

window.ComponentSpecs = ComponentSpecs;

// ── Type & color note artboard ───────────────────────────────
function TypeColorNote() {
  return (
    <div className="tc-board" style={{ width: 880 }}>
      {/* Palette */}
      <div className="tc-section">
        <h3>Surfaces & ink</h3>
        <div className="swatch-row">
          {[
            ['Page',     '#ffffff', '--color-bg-page'],
            ['Subtle',   '#faf9f6', '--color-bg-subtle'],
            ['Sunken',   '#f4f3ef', '--color-bg-sunken'],
            ['Border',   '#e8e6e0', '--color-border'],
            ['Body ink', '#3a3a36', '--color-fg-2'],
            ['Heading',  '#15140f', '--color-fg-1'],
          ].map(([n, c, v]) => (
            <div className="swatch" key={n}>
              <div className="chip" style={{ background: c }} />
              <span className="lbl">{n}</span>
              <span className="var">{v}</span>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: 10 }}>Brand & accents</h3>
        <div className="swatch-row">
          {[
            ['Orange',          '#f37121', '--color-primary'],
            ['Orange · deep',   '#8a3b0a', '--color-primary-deep'],
            ['Active tint',     '#fff0e5', '--color-active-bg'],
            ['Link',            '#a14a13', '--color-link'],
            ['Instructor amber','#9a6b00', '--role-instructor'],
            ['Robotics red',    '#e74c3c', '--topic-robotics'],
          ].map(([n, c, v]) => (
            <div className="swatch" key={n}>
              <div className="chip" style={{ background: c }} />
              <span className="lbl">{n}</span>
              <span className="var">{v}</span>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: 10 }}>Callouts (run-sheet & troubleshooting)</h3>
        <div className="swatch-row">
          {[
            ['Watch for',   '#eef2ff', '#1f3a8a', 'mc-watch'],
            ['Finish early','#ecfdf5', '#115e3a', 'mc-early'],
            ['If stuck',    '#fff7ed', '#8a4b00', 'mc-stuck'],
          ].map(([n, bg, fg, v]) => (
            <div className="swatch" key={n}>
              <div className="chip" style={{ background: bg, border: `1px solid ${fg}30` }} />
              <span className="lbl" style={{ color: fg }}>{n}</span>
              <span className="var">.{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="tc-section">
        <h3>Type scale</h3>
        <div className="type-sample">
          <div className="ts-text" style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.018em' }}>Let's Turn</div>
          <div className="ts-meta">Session H1 · 30px / 1.1 · Bold · −0.018em</div>
        </div>
        <div className="type-sample">
          <div className="ts-text" style={{ fontSize: 18, fontWeight: 700 }}>Run sheet</div>
          <div className="ts-meta">Section H2 · 18px / 1.2 · Bold</div>
        </div>
        <div className="type-sample">
          <div className="ts-text" style={{ fontSize: 15.5, fontWeight: 700 }}>Iterate to 90°</div>
          <div className="ts-meta">Segment name · 15.5px / 1.3 · Bold</div>
        </div>
        <div className="type-sample">
          <div className="ts-text" style={{ fontSize: 16.5, color: 'var(--color-fg-2)', fontWeight: 400, lineHeight: 1.55 }}>
            Pairs build a Turn Right 90 program, measure with the protractor, and adjust the angle until it lands on 90° three times in a row.
          </div>
          <div className="ts-meta">Body · 16.5px / 1.55 · Regular · readable at arm's length</div>
        </div>
        <div className="type-sample">
          <div className="ts-text" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-fg-muted)', fontWeight: 700 }}>Watch for</div>
          <div className="ts-meta">Eyebrow · 11px · 700 · 0.1em tracking</div>
        </div>
        <div className="type-sample">
          <div className="ts-text" style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 700, fontFeatureSettings: '"tnum"' }}>0:20 – 0:35  ·  15 min</div>
          <div className="ts-meta">Time rail · JetBrains Mono · tabular numerals</div>
        </div>

        <h3 style={{ marginTop: 10 }}>Buttons</h3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn-resources">
            <span className="btn-resources-icon">{Icons.clipboard}</span>
            Resources
          </button>
          <button className="jump-chip active">Overview</button>
          <button className="jump-chip">Run sheet</button>
        </div>
      </div>
    </div>
  );
}

window.TypeColorNote = TypeColorNote;
