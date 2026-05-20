// Robot Explorers — Edison curriculum
// Canonical example: G3S1 (Block Builders), Session 5 — "Let's Turn"
// Real content lifted from curriculum.jointheleague.org/Robot-Explorers/

window.SESSION = {
  semester: {
    code: "G3S1",
    title: "Block Builders",
    slug: "grade-3-s1",
    grade: 3,
    summary:
      "Third graders move from barcodes into block-based programming with EdBlocks. They learn to drive, turn, navigate a maze, and play the ball game with code they wrote themselves.",
  },
  number: 5,
  total: 8,
  title: "Let's Turn",
  slug: "05-lets-turn",
  // The page summary is our own one-liner of what this session is, in
  // instructor language, distilled from the curriculum.
  summary:
    "Students program Edison to make a 90° right turn, discover it isn't actually 90°, and iterate on the degree value until their robot can drive a closed square.",
  opening:
    "Turning is harder than it looks because robots aren't perfect.",
  glance: [
    { label: "Duration", value: "60 min", icon: "clock" },
    { label: "Grade", value: "Grade 3", icon: "graduation-cap" },
    { label: "Level", value: "EdBlocks", icon: "blocks" },
    { label: "Devices", value: "Yes (1 per pair)", icon: "laptop" },
    { label: "Prep", value: "10 min", icon: "clipboard-check" },
    { label: "Segments", value: "5", icon: "list-ordered" },
  ],
  prev: { title: "Let's Drive", slug: "04-lets-drive", number: 4 },
  next: { title: "Let's Try a Maze", slug: "06-lets-try-a-maze", number: 6 },
  engineering: {
    step: "Try → Observe → Improve",
    body:
      "Every Edison is slightly different. Calibration is part of the engineering process — there is no single right answer, just your robot's answer. This session is the clearest example of the loop you'll get all semester: students predict, run, measure, adjust. Name it explicitly: \"that's the loop.\"",
  },
  // 5 segments, ~60 min, including the PL-4 embodied activity that
  // the actual curriculum page calls out before students touch EdBlocks.
  segments: [
    {
      id: "warmup",
      time: "0:00 – 0:08",
      duration: "8 min",
      name: "Warm-up: drive recap",
      cue: "Pairs power on Edison, reconnect EdBlocks, re-run last session's drive program. Confirm everyone has a working pair before adding turn.",
      steps: [
        "Pairs grab their robot and laptop. Open EdBlocks at edblocksapp.com.",
        "Reconnect Edison over USB (Connect → choose port).",
        "Open last session's drive-forward program. Flash, run, confirm.",
        "If a pair can't reconnect, raise a hand — fix before moving on.",
      ],
      say: [
        "\"Before we add anything new, prove that what worked yesterday still works today.\"",
        "\"If your robot drives, you're ready. If not, hand up — don't change the program.\"",
      ],
      loop: "Understand — re-anchoring what we know.",
      watchFor: [
        "Pairs who skip reconnecting and assume the program is still flashed.",
        "USB cables that charge but don't carry data — common failure mode.",
      ],
      earlyFinish:
        "Have them measure where Edison actually stops and write the number on their sheet. We'll use it in segment 3.",
      stuck:
        "Tab lost focus during connect → refresh and re-grant permission. Or cable is the wrong kind — swap from the spares bin.",
    },
    {
      id: "physical",
      time: "0:08 – 0:18",
      duration: "10 min",
      name: "Physical activity: PL-4 Two-Wheel Robot — Turning",
      cue: "Tape a right-angle on the floor. Two students hold hands and become Edison — one wheel pivots, the other steps. Try to turn 90°. Measure. Adjust step count. Notice it varies.",
      steps: [
        "Clear a 2 m × 2 m space. Tape an L-shape (right angle) on the floor with painter's tape.",
        "Two-student pair: \"left wheel\" stays planted, \"right wheel\" steps in a small arc. Hold hands at all times.",
        "Try a 90° turn. Land on the right-angle line.",
        "Re-run with a different number of steps. Measure with the protractor sheet.",
        "Swap pairs. Each pair gets two attempts.",
        "Debrief on the rug (3 min): every pair found a different number of steps. Why?",
      ],
      say: [
        "\"You are the robot. Your steps are Edison's degrees.\"",
        "\"That's exactly why we have to find the right degree value for our Edison — and why it won't be the same as another team's.\"",
      ],
      loop: "Imagine — building the mental model before students touch the block.",
      watchFor: [
        "Kids who let go of each other's hand — the pivot constraint matters; without it, it's not Edison.",
        "Pairs who get bored at 'measure' — keep this brisk.",
      ],
      earlyFinish:
        "Try a left turn. Or: how many steps for a U-turn (180°)?",
      stuck:
        "If a pair can't physically coordinate, pair them with you as the pivot. The point isn't athletic — it's understanding pivot + step.",
    },
    {
      id: "program",
      time: "0:18 – 0:35",
      duration: "17 min",
      name: "EdBlocks Activity 11: program a 90° turn",
      cue: "Back at the laptops. Build Drive forward 10 cm → Turn Right 90. Run it. Is it 90°? Adjust the degree value until it lands on the right-angle three times in a row.",
      steps: [
        "Open EdBlocks. Drag a Drive Forward (10 cm) block, then a Turn Right (90) block.",
        "Tape a start line on the EdMat. Place Edison on it.",
        "Flash. Run. Lay the printed protractor over the start line. Measure actual turn.",
        "Adjust ONLY the degree value (try 85, 95, 88, 92…). Re-flash, re-run.",
        "Record each attempt and result on Activity Sheet 11.",
        "Three matching runs at 90° = done. Photo the program.",
      ],
      say: [
        "\"The block says 90. The robot says something else. Both are telling the truth — the block is the order, the robot is the result.\"",
        "\"Don't guess the next number — look at what happened. Off by 5? Try 5 less.\"",
      ],
      loop: "Build → Prove — two full passes of the loop, minimum.",
      watchFor: [
        "Pairs who change starting position AND degree value at the same time — only one variable at a time.",
        "Numbers jumping around (85 → 110 → 70) — they're guessing, not measuring.",
        "One kid driving the laptop the whole time — swap roles every other run.",
      ],
      earlyFinish:
        "Do it again for Turn Left. Note: the calibration number is usually different from the right-turn number — that's data.",
      stuck:
        "If a pair can't get within 10° after several tries, scan the Calibrate Motors barcode (in this session's Barcodes block) and retry. If still off, swap robots.",
    },
    {
      id: "square",
      time: "0:35 – 0:55",
      duration: "20 min",
      name: "Square challenge: does it close?",
      cue: "Use your calibrated turn to drive a closed square. The robot should end where it started, facing the same direction.",
      steps: [
        "Tape a 20 cm square on the EdMat as the target shape.",
        "Program: forward 20 cm → turn (your number) → repeat 4 times. (Or use a Repeat 4 block if pairs are ready for it.)",
        "Flash. Run. Measure how far the end position is from the start.",
        "Adjust either the turn value or the forward distance — pairs choose which variable.",
        "Three closed-square runs in a row = challenge complete.",
      ],
      say: [
        "\"A real engineering test isn't 'did it work once.' It's 'does it work again.'\"",
        "\"If your square doesn't close, the error is small in one step but adds up over four.\"",
      ],
      loop: "Prove — at a higher bar. The square exposes errors that the single turn hid.",
      watchFor: [
        "The moment a pair realizes error compounds — name it out loud when it happens.",
        "Robots with strong drift may never close. That's data, not failure.",
      ],
      earlyFinish:
        "Try a triangle (3 turns of 120°). Or: predict what would happen with 5 sides.",
      stuck:
        "Single turn good but square way off? Forward distance is probably the issue — wheels slip differently after a turn. Try shorter forward distance.",
    },
    {
      id: "wrap",
      time: "0:55 – 1:00",
      duration: "5 min",
      name: "Wrap & share",
      cue: "Two pairs share their calibrated turn number. Note how different they are.",
      steps: [
        "Two volunteer pairs share their final turn number aloud.",
        "Write both on the board. Highlight that they're not the same.",
        "Ask: \"Why aren't they the same?\" Take one or two answers.",
        "Save EdBlocks programs. Pack up robots and cables.",
      ],
      say: [
        "\"Same block. Same number on the screen. Different robot — different result. That's why engineers test on the real thing.\"",
      ],
      loop: "Improve / reflect — closing the loop explicitly.",
      watchFor: [
        "Pairs who don't save their EdBlocks file — they'll need it next session.",
      ],
      earlyFinish: null,
      stuck: null,
    },
  ],
  materials: {
    physical: [
      { name: "Edison robots", qty: "1 per pair", required: true },
      { name: "EdMat (place mat)", qty: "1 per pair", required: true },
      { name: "Painter's tape", qty: "1 roll", required: true },
      { name: "Protractor / angle guide (printed)", qty: "1 per pair", required: true, pdf: "https://curriculum.jointheleague.org/Robot-Explorers/resources/printable-documents/" },
      { name: "Activity Sheet 11", qty: "1 per student", required: true, pdf: "https://curriculum.jointheleague.org/Robot-Explorers/resources/printable-documents/" },
      { name: "Spare AA batteries", qty: "4-pack", required: false },
    ],
    devices: [
      { name: "Laptop with Chrome or Edge", qty: "1 per pair", required: true },
      { name: "USB-A cable (data, not just charging)", qty: "1 per pair", required: true },
      { name: "EdBlocks open in browser", qty: "edblocksapp.com", required: true },
    ],
  },
  // For Session 5, name the barcodes that may come up so the
  // instructor can locate them on the PRINTED barcode sheet.
  // (Edison can only scan barcodes by sitting on the paper — they
  // cannot be scanned from a phone or laptop screen.)
  sessionBarcodes: [
    {
      id: "calibrate-motors",
      name: "Calibrate motors",
      where: "Calibration row of the printed sheet",
      role: "Use if a robot turns wildly off after several iteration attempts. Place Edison on the printed barcode, scan, then run on a flat surface.",
    },
    {
      id: "reset",
      name: "Reset Edison",
      where: "Bottom of the printed sheet",
      role: "Last-resort recovery when an EdBlocks flash fails repeatedly. Students will need to re-flash their program after.",
    },
  ],
  // Printable PDFs the instructor will want on hand. Hooked into
  // the sticky-header "Resources" button.
  resources: [
    {
      id: "barcode-sheet",
      name: "Edison barcode sheet",
      note: "Print one per table. Robots only scan from paper.",
      href: "https://curriculum.jointheleague.org/Robot-Explorers/resources/barcodes/",
      type: "PDF",
    },
    {
      id: "activity-11",
      name: "Activity Sheet 11",
      note: "Where students record their iteration attempts.",
      href: "https://curriculum.jointheleague.org/Robot-Explorers/resources/printable-documents/",
      type: "PDF",
    },
    {
      id: "protractor",
      name: "Protractor / angle guide",
      note: "One per pair. Used to measure actual turn angles.",
      href: "https://curriculum.jointheleague.org/Robot-Explorers/resources/printable-documents/",
      type: "PDF",
    },
    {
      id: "edblocks",
      name: "EdBlocks (web app)",
      note: "The programming environment. Open before class.",
      href: "https://www.edblocksapp.com/",
      type: "Link",
    },
    {
      id: "troubleshoot-edison",
      name: "Edison troubleshooting (full)",
      note: "Platform-wide reference beyond this session's gotchas.",
      href: "https://meetedison.com/robot-help/",
      type: "Link",
    },
  ],
  troubleshooting: [
    {
      id: "turn-off",
      symptom: "Robot turns far more or less than 90° even after several iteration attempts.",
      cause: "Motor calibration drift — the left and right motors aren't matched.",
      fix:
        "Open the sticky Barcodes button → Calibrate motors. Place Edison on a flat surface, scan, don't move it during calibration. Re-run the pair's turn program.",
    },
    {
      id: "usb",
      symptom: "EdBlocks won't connect. \"No device found\" or \"Disconnected.\"",
      cause: "USB cable is charge-only (no data lines), or the browser tab lost device permission.",
      fix:
        "Confirm cable is the data type from the spares bin. Click in the EdBlocks tab, then Connect again. If still failing, refresh and re-grant permission to the port.",
    },
    {
      id: "square",
      symptom: "Single turn lands at ~90° but the square never closes.",
      cause:
        "Forward distance and turn error compound over 4 sides. A 2° error per turn = 8° off after four turns. Wheels slip differently after a turn vs. from a stop.",
      fix:
        "Have the pair re-measure the single turn first. Then shorten forward distance to 10 cm to reduce drift. If still off, swap robots.",
    },
    {
      id: "battery",
      symptom: "Robot runs the first half of a program and then stops.",
      cause: "Low batteries — Edison gets sluggish below ~3.6 V.",
      fix: "Swap in four fresh AAs from the spare pack and re-run.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// G3S1 Block Builders — all 8 sessions, for the sidebar nav.
// ─────────────────────────────────────────────────────────────
window.SEMESTER_SESSIONS = [
  "Robot Boot Camp",
  "Clap Racing and Sensor Games",
  "Welcome to EdBlocks",
  "Let's Drive",
  "Let's Turn",
  "Let's Try a Maze",
  "Maze Challenge",
  "Ball Game with EdBlocks",
];

// ─────────────────────────────────────────────────────────────
// Six semesters of Robot Explorers, for the desktop sidebar tree.
// ─────────────────────────────────────────────────────────────
window.ALL_SEMESTERS = [
  { code: "G2S1", title: "Meet the Robots",   level: "Barcodes" },
  { code: "G2S2", title: "Program the Robot", level: "Card Coding" },
  { code: "G3S1", title: "Block Builders",    level: "EdBlocks", current: true },
  { code: "G3S2", title: "Sensor Squad",      level: "EdBlocks" },
  { code: "G4S1", title: "Challenge Engineers", level: "EdBlocks" },
  { code: "G4S2", title: "Robot Masters",     level: "EdScratch" },
];

// ─────────────────────────────────────────────────────────────
// Full barcode catalog — the sheet behind the sticky "Barcodes"
// button. Real Edison barcodes are short black-bar patterns.
// ─────────────────────────────────────────────────────────────
window.BARCODES = [
  // Driving
  { id: "drive-forward-30", name: "Drive forward 30 cm", group: "Driving", role: "Edison drives straight forward 30 cm and stops.", pattern: "1011001011010011" },
  { id: "turn-right-90",    name: "Turn right 90°",       group: "Driving", role: "Edison rotates right 90 degrees (approximately — calibrate!).", pattern: "1100110100110101" },
  { id: "turn-left-90",     name: "Turn left 90°",        group: "Driving", role: "Edison rotates left 90 degrees (approximately).", pattern: "1010110010110101" },
  { id: "drive-back-30",    name: "Drive backward 30 cm", group: "Driving", role: "Edison reverses 30 cm and stops.", pattern: "1101001010110011" },

  // Sensors
  { id: "follow-line",      name: "Follow a line",        group: "Sensors", role: "Edison follows a thick black line on white paper, using the line-tracking sensor.", pattern: "1010010110110011" },
  { id: "stay-in-borders",  name: "Stay in borders",      group: "Sensors", role: "Edison drives but turns around when it sees a black border line — like a Roomba.", pattern: "1100101101001011" },
  { id: "obstacle-avoid",   name: "Avoid obstacles",      group: "Sensors", role: "Edison drives forward and steers around obstacles using the infrared sensors.", pattern: "1011010011010110" },
  { id: "clap-control",     name: "Clap control",         group: "Sensors", role: "Clap once to make Edison turn. Clap twice to make Edison drive forward.", pattern: "1101100100110101" },
  { id: "follow-torch",     name: "Follow torch",         group: "Sensors", role: "Edison drives toward the brightest light it can see.", pattern: "1010110101100110" },
  { id: "avoid-light",      name: "Avoid light",          group: "Sensors", role: "Edison drives away from light, hiding in shadow.", pattern: "1100110101001011" },

  // Games
  { id: "sumo",             name: "Sumo wrestle",         group: "Games", role: "Edison drives forward looking for an opponent, then charges. Two robots in a taped circle = sumo.", pattern: "1011010110010110" },
  { id: "bounce",           name: "Bounce in borders",    group: "Games", role: "Edison drives forward, bouncing off black border lines like a pinball.", pattern: "1101010010110011" },

  // Remote control
  { id: "tv-remote",        name: "TV remote control",    group: "Remote", role: "Use any IR remote to drive Edison. Numbers map to drive / turn / stop.", pattern: "1010011010110101" },
  { id: "edison-remote",    name: "Edison-to-Edison",     group: "Remote", role: "One Edison sends IR commands to a second Edison nearby.", pattern: "1100101010110110" },

  // Calibration / system
  { id: "calibrate-motors", name: "Calibrate motors",     group: "Calibration", role: "Resets the motor balance so left and right drive equally. Run on a flat surface, don't move the robot.", pattern: "1011010101100100" },
  { id: "calibrate-line",   name: "Calibrate line sensor",group: "Calibration", role: "Reset the line-following sensor on the surface you'll use. Place over the black line.", pattern: "1101001011010110" },
  { id: "reset",            name: "Reset Edison",         group: "Calibration", role: "Clears Edison's program and returns it to the welcome state.", pattern: "1010110010101101" },
];
