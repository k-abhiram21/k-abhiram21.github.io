# Abhiram — work & thinking

A buildless, static portfolio for GitHub Pages. HTML, CSS, and JavaScript; local fonts; SVG/canvas visuals; no external runtime, analytics, or backend.

## Preview

```sh
python3 -m http.server 8877 --bind 127.0.0.1
```

Open `http://127.0.0.1:8877`. Changes appear on [GitHub Pages](https://k-abhiram21.github.io) after publication. No custom domain is configured.

## Pages

- `index.html` — project notebook introduction, an interaction across four fields of work, balanced project/research previews, About, and Contact
- `projects.html` — StreamWatch and HeliVision, with links to full project stories
- `streamwatch.html` — monitoring MongoDB and application health; architecture, workspace, and the query-context integration
- `helivision.html` — motivation, camera-to-cue mechanism, and Raspberry Pi integration
- `research.html` — distinct chapters for uncertainty-based detection limits and adapter routing/verifier research

Shared presentation is in `styles.css`. `app.js` handles the project notebook, homepage story, page/section navigation state, theme controls, visible-diagram motion, and square pixels. `trails.js` supplies the tapered section indicator and browser-owned text-selection trail.

Each page contains native links and readable content without JavaScript. The homepage interaction enhances short examples; full stories are available on their own pages. Headers provide a visible Home link, project/research navigation, and a single fixed GitHub **profile** link. Relevant repository links appear only in the respective case studies. Contact has one email action and the owner-supplied LinkedIn URL.

## Content direction

The introduction focuses on systems, Linux, AI engineering, and research. Breadth across software, observability, research, and one embedded project demonstrates adaptability. StreamWatch leads with MongoDB observability; query labels are one implementation decision. HeliVision explains the owner-approved anonymous motivation: partial vision loss from optic nerve damage making approaching traffic harder to notice. No family identity is disclosed.

Research descriptions focus on the problem, Abhiram’s contribution, engineering judgment, and lessons from the work. The broader framework remains credited to the team. The Phase 1 manuscript is submitted to KAIS, with editor. Research summaries and conceptual illustrations avoid unpublished implementation procedures, experimental records, and future research proposals. Private source documents remain outside this checkout.

Native disclosures add depth through problem framing, debugging practice, collaboration, and evaluation responsibilities. The homepage notes link directly to those sections and open the relevant disclosure on arrival. HeliVision and StreamWatch retain implementation notes drawn from their public repositories.

## Visuals and motion

The front-view helmet schematic follows the public README’s visor layout: OLED at the lower centre of the visor, camera above, Raspberry Pi on top. The StreamWatch diagram separates the application/data path from the metrics path; Grafana panels return to the workspace. Research diagrams explain agreement versus correctness and the reasoning from a question through evidence to a decision.

SVG motion is lightweight: moving flow segments, a visor scan, OLED emphasis, and sampled-answer emphasis. IntersectionObserver pauses offscreen/hidden diagrams; reduced-motion preferences give a still view. These are explanatory schematics.

The intentional interaction system remains: 2px square pixels on an 8px lattice, shared illumination intensity, cursor-following primary surfaces, a clockwise secondary notebook action, text and diagram masking, section reveals, fixed-control color wipes, and instant page-wide light/dark themes. Selected illustrations, project cards, note summaries, and a few text sections respond to the pointer. Text and SVG labels are protected; cached linework masks let the effect extend across illustration backgrounds without hiding diagram shapes. Geometry is cached, and frames stop when idle or offscreen.

Phone layouts provide five fixed bottom navigation links and safe-area spacing. Homepage steps support tap, mouse hover, focus, and arrow keys; sticky step taps bring an explanation back into view if necessary. Text selection retains normal browser copying and native touch/keyboard fallbacks. No global custom cursor or theme-transition overlay is used.

The homepage opens with HeliVision selected in a three-project notebook. Its card straightens on hover or keyboard focus; on phones, scrolling it into view gradually levels it. Selected artwork also gets a small scroll-driven pixel response on phones. Reduced-motion settings remove the card motion and scroll response. Project selection supports click, tap, and arrow keys. All five pages use plain first-person explanations, with technical depth kept in the native disclosures.

The About section includes an AI Research Intern role at LLMLens Paradigm (February 2026–present), within String of Pearls at K-Hub, KMIT, and a compact skills overview. Both research phases are framed as internship work. HeliVision features the team’s second prize at Prakalp-2025 and published Indian patent application 202541100066, under examination. Dates and application wording follow the owner’s confirmation, résumé, and public project README. No granted-patent or accepted-paper claim is made. The owner-approved October résumé is available at `assets/documents/abhiram-kondaguduru-resume.pdf`, linked from every header, the homepage introduction, and Contact. It is an unchanged copy of the supplied PDF.

## Reading and discoverability

The browser titles use Abhiram's full name and page subject. Each page declares
its canonical GitHub Pages URL; `sitemap.xml` lists the five pages and
`robots.txt` points to it. Update sitemap dates when the corresponding page
content changes. These aids do not guarantee search-engine indexing.

All three hero notes are authored in the initial HTML. JavaScript switches their
visibility, refreshes pixel text masks, and updates the selected button state.
HeliVision remains the default. Research disclosures have distinct roles:
implementation, debugging, and evaluation. They retain the public research
boundary rather than filling the page with private experiment details.

Project source links sit immediately after each case-study introduction.
HeliVision's outdoor walk is described as a prototype check, without invented
accuracy or latency figures. StreamWatch distinguishes its original metrics
approach from the cardinality tradeoff and a more suitable design for a larger
deployment. A private maintenance checkout and regression tests are outside this
public site; the case study does not claim that those changes are deployed.

## Reading flow and contact

The homepage introduces the work; project and research pages explain the motivation
and decisions; optional notes add implementation detail. Each case study keeps a
single contribution summary. StreamWatch explains the need to observe application
behavior alongside flexible document data. Contact provides email, a copy-email
control with a native fallback, LinkedIn, and the résumé download. Existing pixel,
notebook, scroll, and diagram interactions remain in place.
