// App — design canvas with Mockups, Components, and Type/Color sections.
// The mobile and desktop session pages are real, interactive React mocks
// living inside iOS / browser-window frames.

const { DesignCanvas, DCSection, DCArtboard,
        IOSDevice, MobileSessionPage, DesktopSessionPage,
        ResourcesSheet, ComponentSpecs, TypeColorNote } = window;

// ── Mobile mockup wrapper (iOS frame) ───────────────────────
function MobileMockup({ storagePrefix, startWithSheetOpen = false }) {
  const [sheetOpen, setSheetOpen] = useState(startWithSheetOpen);

  return (
    <IOSDevice width={390} height={780}>
      <div style={{ height: '100%', position: 'relative', background: '#fff' }}>
        {/* Status bar sits under the screen's top; push content down */}
        <div style={{ height: 50, background: '#fff' }} />
        <div style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 0 }}>
          <MobileSessionPage
            session={window.SESSION}
            onOpenResources={() => setSheetOpen(true)}
            storagePrefix={storagePrefix}
          />
          <ResourcesSheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            resources={window.SESSION.resources}
            sessionBarcodes={window.SESSION.sessionBarcodes}
          />
        </div>
      </div>
    </IOSDevice>
  );
}

// Pre-scrolled phone that shows the sticky header pinned and the
// run sheet mid-page — demonstrates the sticky-header behavior.
function MobileScrolledMockup({ storagePrefix }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // After mount, scroll the inner page to expose the sticky header
    // doing its job against the run sheet.
    const t = setTimeout(() => {
      const scroller = scrollRef.current?.querySelector('.session-page');
      if (scroller) scroller.scrollTo({ top: 720, behavior: 'instant' });
    }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={scrollRef} style={{ width: '100%', height: '100%' }}>
      <IOSDevice width={390} height={780}>
        <div style={{ height: '100%', position: 'relative', background: '#fff' }}>
          <div style={{ height: 50, background: '#fff' }} />
          <div style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 0 }}>
            <MobileSessionPage
              session={window.SESSION}
              onOpenResources={() => {}}
              storagePrefix={storagePrefix}
            />
          </div>
        </div>
      </IOSDevice>
    </div>
  );
}

// ── Browser-window wrapper for desktop ──────────────────────
function BrowserChrome({ url, children, width = 1280, height = 820 }) {
  return (
    <div style={{
      width, height, background: '#fff',
      borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 24px 60px rgba(15,14,10,0.18), 0 0 0 1px rgba(15,14,10,0.08)',
      display: 'flex', flexDirection: 'column',
      fontFamily: '-apple-system, system-ui, sans-serif',
    }}>
      <div style={{
        height: 36, background: '#f4f3ef', borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8, flex: '0 0 auto',
      }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        <div style={{
          marginLeft: 16, padding: '4px 12px',
          background: '#fff', borderRadius: 6, fontSize: 12,
          color: '#75736c', maxWidth: 580,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          border: '1px solid var(--color-border)',
        }}>{url}</div>
      </div>
      <div style={{ flex: 1, minHeight: 0, fontFamily: 'var(--font-body)' }}>{children}</div>
    </div>
  );
}

function DesktopMockup() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <BrowserChrome url="curriculum.jointheleague.org/Robot-Explorers/grade-3-s1/05-lets-turn/" width={1280} height={820}>
      <div style={{ position: 'relative', height: '100%' }}>
        <DesktopSessionPage
          session={window.SESSION}
          onOpenResources={() => setSheetOpen(true)}
          storagePrefix="d"
        />
        <ResourcesSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          resources={window.SESSION.resources}
          sessionBarcodes={window.SESSION.sessionBarcodes}
        />
      </div>
    </BrowserChrome>
  );
}

// ── App ─────────────────────────────────────────────────────
function App() {
  return (
    <DesignCanvas
      title="Edison Session Page · G3S1 Block Builders · Session 5 · Let's Turn"
      subtitle="Instructor-facing curriculum page · Robot Explorers (grades 2–4) · mobile-first hi-fi"
    >
      <DCSection id="mockups" title="Mockups"
        subtitle="Live, interactive prototypes. Tap segments, check materials, open Resources.">
        <DCArtboard id="mobile" label="Mobile · top of page" width={390} height={780}>
          <MobileMockup storagePrefix="m1" />
        </DCArtboard>

        <DCArtboard id="mobile-scrolled" label="Mobile · sticky pinned, mid-run-sheet" width={390} height={780}>
          <MobileScrolledMockup storagePrefix="m2" />
        </DCArtboard>

        <DCArtboard id="mobile-resources" label="Mobile · Resources sheet open" width={390} height={780}>
          <MobileMockup storagePrefix="m3" startWithSheetOpen={true} />
        </DCArtboard>

        <DCArtboard id="desktop" label="Desktop · 1280px" width={1280} height={820}>
          <DesktopMockup />
        </DCArtboard>
      </DCSection>

      <DCSection id="components" title="Component treatments"
        subtitle="Each block called out, collapsed and expanded states where relevant.">
        <DCArtboard id="specs" label="Specs · five components" width={760} height={2200}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: 8 }}>
            <ComponentSpecs />
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="typecolor" title="Type & color note"
        subtitle="Foundation tokens for building the remaining 47 session pages consistently.">
        <DCArtboard id="tc" label="Tokens" width={880} height={780}>
          <TypeColorNote />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
