# Edison Session Page — Design Brief

A specification for the layout, content, and behavior of an instructor-facing
session page in the Robot Explorers curriculum (Edison robots, grades 2–4).

---

## 1. Who this is for, and where they'll be

**User:** the instructor running the session. Not the student.

Instructors are typically professional engineers volunteering through The
League. They are competent adults who can read and execute, but most are *not*
trained elementary educators and most are seeing this material for the first
time. They need a page that gives them confidence in front of a room of
8-year-olds, not a teaching philosophy essay.

**Where they'll read it:**

- **Before class, on a laptop** — to prep. Want the full picture.
- **During class, on a phone** — to glance at while circulating among tables.
  This is the dominant use case. Hands are busy with robots, kids are loud,
  the page is on a propped-up phone or in a pocket pulled out between
  activities.
- **In the moment, on a phone** — "what's the sumo barcode?" — a kid is
  waiting, the answer needs to be one tap away.

**Design implication:** mobile is not the responsive afterthought. Mobile is
the primary view. Desktop should be the wider, more comfortable version of the
same content, not a different layout with the phone version stripped down.

---

## 2. What the page must do, in priority order

1. **Tell the instructor what's going to happen this hour, at a glance.** They
   should be able to look at the top of the page and know the shape of the
   session in five seconds.
2. **Give them everything they need to actually run each activity.** Step
   order, what to say, what to watch for, how long it takes, what materials
   to have out.
3. **Put the barcodes one tap away.** Always. From any point in the page.
4. **Anticipate the things that go wrong.** USB doesn't connect, the robot
   drifts, a kid finishes early, a kid is stuck. Don't make the instructor
   diagnose from scratch.
5. **Make the engineering arc visible** so the instructor can talk about it
   if a parent or principal asks, but don't bury the practical content under
   it.

If those five things aren't easy, the page has failed regardless of how
attractive it is.

---

## 3. Page structure

The page is one scrollable document with a sticky element at the top for
in-class access. Below is the top-to-bottom order, with notes on each block.

### 3.1 Sticky header (always visible)

A thin band that stays pinned as the page scrolls. Contains:

- Class name and session number, compact: *Class 3 · Session 5 — Let's Turn*
- A **Barcodes** button. Tap → opens the barcode sheet (see §4). This is the
  most-used control on the page.
- A **Jump to** menu or row of small chips: Overview, Activity, Materials,
  Troubleshooting. Tapping scrolls to that section.

On a phone, the sticky band should be roughly 48–56 pixels tall. It needs
breathing room for thumb taps but cannot eat the screen.

### 3.2 Session header

The "five-second" block. Contains, in this order:

- **Session title** as the page's H1.
- **Position in the course:** Class N, Session M of 8. Helps a substitute
  instructor or a returning one orient.
- **One-sentence summary of what students will do this session.** Written
  plainly. Not "Students will explore the affordances of rotational
  parameters." More like "Students program Edison to make a 90° turn, find
  out it's never exactly 90°, and adjust."
- **At-a-glance strip**, four to six small badges:
  - Duration (60 min)
  - Grade band (Grade 3)
  - Programming level (Level 3 — EdBlocks app)
  - Devices needed? (Yes / No)
  - Prep time before class (e.g., 10 min)
  - Activity count (e.g., 3 segments)

This strip is critical on mobile because it conveys the entire logistical
profile of the session in one row, scannable without reading prose.

### 3.3 Opening concept

The "what's the point of this session" sentence pulled straight from the
curriculum (e.g., "Turning is harder than it looks because robots aren't
perfect"). Set this in larger type than body text, visually distinct, but not
a giant blockquote that wastes screen. This is what the instructor says out
loud to start the class, more or less.

### 3.4 Run sheet

The single most important block on the page. A time-segmented sequence of
what happens during the hour. Each row is one segment.

For each segment, show:

- **Approximate time** (e.g., 0:00–0:10) and duration. Time should be relative
  to session start, not wall-clock. An instructor running late can still
  follow "spend 10 minutes on this, then 15 on that."
- **Segment name** (e.g., "Warm-up: drive forward 30 cm", "Mini-lesson: turn
  blocks", "Iterate to 90°", "Square challenge").
- **One-line instructor cue** — what to do or say to start this segment.
- **An expand control.** Tapping expands a panel underneath that segment with:
  - Detailed steps for the instructor.
  - Specific things to say, demonstrate, or write on the board.
  - The engineering-loop framing for this segment (Understand → Imagine →
    Build → Prove) so the instructor can name it explicitly with students.
  - "Watch for" notes — common student mistakes, what success looks like.
  - "If they finish early" notes — extension challenges.
  - "If they're stuck" notes — the most common cause and what to do.

Collapse all segments by default on phones; expand by default on desktop, or
let the user toggle once and remember. The visible-by-default run sheet on
desktop is the prep view; the collapsed view on phones is the in-the-room
view.

### 3.5 Materials checklist

A flat list, checkable on the device (state stored locally so refresh doesn't
lose ticks). Two columns or sections:

- **Robots and physical** — Edison robots (one per pair), ball game catch,
  EdMat, tape, foam noodles, etc.
- **Printed** — barcode list (one per table), student activity sheet 11,
  protractor sheet, etc. Each printed item is a link to the PDF.
- **Devices** — only present if devices are required. Lists Chrome/Edge
  requirement, USB cables, count needed.

A simple "I've got everything" toggle at the bottom is overkill. Just let
items be tickable.

### 3.6 Barcodes for this session

Even though the sticky Barcodes button gives access to the full set, this
section calls out the specific barcodes used in *this* session, full-size,
ready to scan. For Session 5 ("Let's Turn"), that might be empty because
turns are programmed in EdBlocks, but for Session 1 of any class it's the
clap-control, obstacle-avoidance, sumo, etc., barcodes.

Each barcode shows:

- The barcode image, large enough that a phone screen can be pointed at
  Edison and scanned. (This means full-bleed on phone, with white margin
  around the bars.)
- The barcode name.
- One sentence on what it does.
- A "view full sheet" link if there's a printable version.

Yes, instructors will scan barcodes directly off the phone screen. This works
with Edison and it saves the day when a print copy went missing.

### 3.7 Engineering connection

A short block — two or three sentences — naming which step of the engineering
loop this session emphasizes and why. This is for the instructor to read once
during prep, and to glance at if they want to articulate the "why" to a kid
who asks. It should not be the dominant visual element on the page.

### 3.8 Troubleshooting

A short list of the specific things that go wrong in *this* session. Not a
generic Edison troubleshooting page. For Session 5, that's:

- Robot turns far more or less than 90°. Cause + fix.
- Robot won't connect to EdBlocks. Cause + fix.
- Kids' squares don't close. Cause + fix.

Three to six items, each one tappable to expand if the fix is more than one
line. Link to a global troubleshooting page at the bottom for anything not
listed.

### 3.9 What's next, what came before

Two small links at the bottom: previous session and next session, with their
titles. Helps an instructor mentally chain sessions and helps a substitute
who's stepping in mid-class understand context.

### 3.10 Footer

Curriculum name, "Robot Explorers", a link back to the class index, and a
quiet "report a problem with this page" link so instructors who find a bug
or a typo have somewhere to send it.

---

## 4. The barcode sheet (separate view, reachable from sticky header)

Tapping **Barcodes** in the sticky header opens an overlay or dedicated page
showing the full barcode catalog: pre-set programs, calibration, remote
control, etc.

Requirements:

- Each barcode renders large enough to scan from a phone screen.
- Grouped by category (Driving, Sensors, Games, Calibration, etc.).
- Searchable. A single search field at the top filters by name. "sumo" should
  return one card, full-screen-able.
- A barcode card, when tapped, expands or zooms to fill the screen — both for
  scanning from the phone and for showing to a kid.
- A link to the printable PDF of the full barcode list is at the top of the
  sheet, for instructors prepping before class.

This is the only piece of the site that probably wants a dedicated view
rather than a section in the page. Instructors will want to bookmark it.

---

## 5. Responsive behavior

Build mobile-first. Three breakpoints are enough:

- **Phone (≤640px):** single column. Sticky header is full width. Run sheet
  segments collapsed by default. Barcode images full-width with margin. Type
  big enough to read at arm's length on a propped phone — body text around
  16–17px, not 14.
- **Tablet (641–1024px):** still single column, but with more horizontal
  padding and slightly larger type. Run sheet segments may default to
  expanded.
- **Desktop (≥1025px):** two columns when it helps. Left column is the run
  sheet expanded. Right column (about a third of width) holds materials,
  barcodes-for-this-session, and engineering connection as a sidebar. The
  sticky header remains but can be slimmer.

Avoid hover-only interactions. Every control must work with tap and with
keyboard.

---

## 6. Visual character

This is for The League — a tech-education nonprofit teaching kids. The pages
should feel professional, not cute, not corporate, not enterprise-CMS-stock.
Think the visual register of a good developer tools site that happens to be
teaching second-graders: clean typography, generous whitespace, restrained
color, one or two accent colors used purposefully (e.g., the sticky-header
Barcodes button stands out because it's the most-used control).

The robot itself is the brand element. If photography or illustration of
Edison appears on the page, it appears at the top of the session header — not
sprinkled decoratively throughout. The content is the design.

Avoid:

- Stock-photo classrooms.
- Long horizontal banners that push the run sheet below the fold on mobile.
- Cards-everywhere layouts where every section is a tile. Cards have weight;
  use them where structure actually benefits (run sheet segments, barcode
  cards), and use plain section breaks elsewhere.
- Decorative icons next to every heading. One or two functional icons (the
  Barcodes button, the expand chevrons on run-sheet segments) are plenty.

Color and type should support reading at arm's length on a phone in a
fluorescent-lit classroom. High contrast, no light-gray-on-white body text.

---

## 7. Content sources

Each session page is generated from the corresponding session entry in the
Robot Explorers curriculum document. Mapping:

| Source field in curriculum | Where it appears on the page |
|---|---|
| Session title | H1 in session header |
| Class & session number | Position line in session header; sticky header |
| Opening concept | §3.3 Opening concept block |
| Activity bullets | §3.4 Run sheet segments (one to three segments per session, broken out where natural) |
| Engineering connection | §3.7 Engineering connection block |
| Materials | §3.6 Materials checklist |
| Programming level (from Programming Progression table) | At-a-glance strip |
| Class goal (from class header) | Available on the class index page; not repeated on every session page |

Three pieces of content do **not** exist in the source curriculum and will
need to be written for each session:

1. **Run sheet time segmentation.** The curriculum lists activities; it
   doesn't break the 60 minutes into timed segments. This is the
   curriculum-authoring work that has to happen before pages can be filled.
2. **Watch-for and finish-early notes.** Drawn from instructor experience.
3. **Troubleshooting items specific to the session.** Drawn from instructor
   experience and the Edison platform's known quirks.

These three should be templated so they get written consistently across all
48 sessions (6 classes × 8 sessions).

---

## 8. Out of scope for this design

To keep the brief tight, the following are explicitly *not* part of the
session page and should not creep in:

- Student-facing content. Students don't see this page.
- Curriculum-wide context (engineering loop overview, programming
  progression). That belongs on a separate "About Robot Explorers" page,
  linked from the class index.
- Lesson assessment or grading. Robot Explorers doesn't grade.
- Standards alignment. Optional; if added, it lives at the bottom of the
  page, collapsed by default, and never on mobile above the run sheet.
- Account-aware features. No login. No saved progress beyond the
  materials-checklist local state.

---

## 9. What to hand to Claude Design

When this brief moves to visual design, what's needed back:

- A mobile mockup of one full session page, scrollable, with the sticky
  header behavior shown.
- A desktop mockup of the same session.
- A mobile mockup of the barcode sheet, including the zoomed/scannable
  state.
- Component-level treatments of: the at-a-glance strip, a run-sheet segment
  (collapsed and expanded), a barcode card, a troubleshooting item.
- A short type and color note so the rest of the 48 pages can be built out
  consistently.

Use Session 5 of Class 3 ("Let's Turn") as the canonical example. It's
representative: devices required, real engineering content, predictable
failure modes, mid-course timing.
