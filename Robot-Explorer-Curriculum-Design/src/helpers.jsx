// Edison Session Page — shared helpers, icons, barcode renderer
const { useState, useEffect, useRef, useMemo } = React;

// ── Icons (inline SVG, 1.5px stroke, currentColor) ────────────
const Icon = ({ d, size = 16, sw = 1.6, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
       stroke="currentColor" strokeWidth={sw}
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {typeof d === 'string' ? <path d={d} /> : d}
  </svg>
);

const Icons = {
  chevronDown: <Icon d="M6 9l6 6 6-6" />,
  chevronRight: <Icon d="M9 6l6 6-6 6" />,
  chevronLeft: <Icon d="M15 6l-9 6 9 6" />,
  x: <Icon d="M6 6l12 12M18 6L6 18" />,
  search: <Icon d={<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>} />,
  check: <Icon d="M5 12l5 5L20 7" sw={2.2} />,
  clock: <Icon d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />,
  grad: <Icon d="M3 9l9-4 9 4-9 4-9-4zm0 0v6m18-6v6m-9 4v3" />,
  blocks: <Icon d={<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>} />,
  laptop: <Icon d={<><rect x="3" y="5" width="18" height="11" rx="1.5" /><path d="M2 19h20" /></>} />,
  list: <Icon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  clipboard: <Icon d={<><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4v-1a1 1 0 011-1h4a1 1 0 011 1v1M9 13l2 2 4-4" /></>} />,
  barcode: (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="currentColor">
        <rect x="3" y="5" width="1.5" height="14" />
        <rect x="6" y="5" width="1" height="14" />
        <rect x="9" y="5" width="2.5" height="14" />
        <rect x="13" y="5" width="1" height="14" />
        <rect x="16" y="5" width="2" height="14" />
        <rect x="20" y="5" width="1.5" height="14" />
      </g>
    </svg>
  ),
  arrowRight: <Icon d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <Icon d="M19 12H5M11 6l-6 6 6 6" />,
  warn: <Icon d={<><path d="M12 9v4" /><path d="M12 17h0" sw={2.6}/><path d="M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.4 0z" /></>} />,
  expand: <Icon d="M4 14v6h6M20 10V4h-6M4 20l7-7M20 4l-7 7" />,
  eye: <Icon d={<><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></>} />,
  github: <Icon d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
};
window.Icons = Icons;
window.Icon = Icon;

// ── Edison barcode (stylized SVG) ─────────────────────────────
// Real Edison barcodes are short black-bar patterns. We render
// each as a 14-bar SVG using the pattern string in data, with a
// border-aware aspect ratio that scans cleanly at any size.
function BarcodeSVG({ pattern, height = 70, width }) {
  const bars = useMemo(() => {
    // Convert "1011001011010011" into a sequence of widths
    const result = [];
    let i = 0;
    while (i < pattern.length) {
      let run = 1;
      while (i + run < pattern.length && pattern[i + run] === pattern[i]) run++;
      result.push({ on: pattern[i] === '1', w: run });
      i += run;
    }
    return result;
  }, [pattern]);

  const totalUnits = bars.reduce((a, b) => a + b.w, 0);
  const unit = 6;
  const w = width ?? totalUnits * unit + 18;
  let x = 9;
  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} role="img" aria-label="Edison barcode">
      <rect x="0" y="0" width={w} height={height} fill="#fff" />
      {bars.map((b, idx) => {
        const bw = b.w * unit;
        const node = b.on ? (
          <rect key={idx} x={x} y={6} width={bw} height={height - 16} fill="#0a0907" />
        ) : null;
        x += bw;
        return node;
      })}
      {/* end-of-code marker (mimics the Edison printed margin caps) */}
      <rect x={w - 8} y={6} width={1.5} height={height - 16} fill="#0a0907" />
      <rect x={7.5} y={6} width={1.5} height={height - 16} fill="#0a0907" />
    </svg>
  );
}
window.BarcodeSVG = BarcodeSVG;

// ── Edison robot mini-mark (header decoration) ────────────────
function RobotMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="9" width="26" height="18" rx="4" fill="#15140f" />
      <rect x="3" y="9" width="26" height="6" rx="4" fill="#f37121" />
      <circle cx="11" cy="12.5" r="1.6" fill="#fff" />
      <circle cx="21" cy="12.5" r="1.6" fill="#fff" />
      <rect x="1" y="14" width="4" height="9" rx="1.5" fill="#15140f" />
      <rect x="27" y="14" width="4" height="9" rx="1.5" fill="#15140f" />
      <rect x="8" y="19" width="16" height="5" rx="1" fill="#232320" />
      <rect x="10" y="20.5" width="2" height="2" fill="#f37121" />
      <rect x="14" y="20.5" width="2" height="2" fill="#fff" />
      <rect x="18" y="20.5" width="2" height="2" fill="#f37121" />
    </svg>
  );
}
window.RobotMark = RobotMark;

// ── localStorage helper ───────────────────────────────────────
function useLocal(key, initial) {
  const [v, setV] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s !== null ? JSON.parse(s) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key, v]);
  return [v, setV];
}
window.useLocal = useLocal;
