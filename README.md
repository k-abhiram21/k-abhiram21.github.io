# Abhiram — work & thinking

A buildless, static portfolio for GitHub Pages. HTML, CSS, and JavaScript; local fonts; SVG/canvas visuals; no external runtime, analytics, or backend.

## Preview

```sh
python3 -m http.server 8877 --bind 127.0.0.1
```

Open `http://127.0.0.1:8877`. Changes appear on [GitHub Pages](https://k-abhiram21.github.io) after publication. No custom domain is configured.

## Pages

- `index.html` — introduction, an interaction across four fields of work, balanced project/research previews, About, and Contact
- `projects.html` — StreamWatch and HeliVision, with links to full project stories
- `streamwatch.html` — monitoring MongoDB and application health; architecture, workspace, and the query-context integration
- `helivision.html` — motivation, camera-to-cue mechanism, and engineering across an unfamiliar platform
- `research.html` — distinct chapters for uncertainty-based detection limits and adapter routing/verifier research

Shared presentation is in `styles.css`. `app.js` handles the homepage story, page/section navigation state, theme controls, visible-diagram motion, and square pixels. `trails.js` supplies the tapered section indicator and browser-owned text-selection trail.

Each page contains native links and readable content without JavaScript. The homepage interaction enhances short examples; full stories are available on their own pages. Headers provide a visible Home link, project/research navigation, and a single fixed GitHub **profile** link. Relevant repository links appear only in the respective case studies. Contact has one email action and the owner-supplied LinkedIn URL.

## Content direction

The introduction focuses on systems, Linux, AI engineering, and research. Breadth across software, observability, research, and one embedded project demonstrates adaptability. StreamWatch leads with MongoDB observability; query labels are one implementation decision. HeliVision explains the owner-approved anonymous motivation: partial vision loss from optic nerve damage making approaching traffic harder to notice. No family identity is disclosed.

Research descriptions focus on the problem, Abhiram’s contribution, engineering judgment, and lessons from the work. The broader framework remains credited to the team. The Phase 1 manuscript is submitted to KAIS, with editor. Research summaries and conceptual illustrations avoid unpublished implementation procedures, experimental records, and future research proposals. Private source documents remain outside this checkout.

Native disclosures add depth through problem framing, debugging practice, collaboration, and evaluation responsibilities. The homepage notes link directly to those sections and open the relevant disclosure on arrival. HeliVision and StreamWatch retain implementation notes drawn from their public repositories.

## Visuals and motion

The front-view helmet schematic follows the public README’s visor layout: OLED at the lower centre of the visor, camera above, Raspberry Pi on top. The StreamWatch diagram separates the application/data path from the metrics path; Grafana panels return to the workspace. Research diagrams explain agreement versus correctness and the reasoning from a question through evidence to a decision.

SVG motion is lightweight: moving flow segments, a visor scan, OLED emphasis, and sampled-answer emphasis. IntersectionObserver pauses offscreen/hidden diagrams; reduced-motion preferences give a still view. These are explanatory schematics.

The intentional interaction system remains: 2px square pixels on an 8px lattice, shared illumination intensity, cursor-following primary surfaces, a clockwise secondary notebook action, text masking, a favicon hero mark, section reveals, fixed-control color wipes, and instant page-wide light/dark themes. Pixel geometry is cached, and frames stop when idle or offscreen.

Phone layouts provide five fixed bottom navigation links and safe-area spacing. Homepage steps support tap, mouse hover, focus, and arrow keys; sticky step taps bring an explanation back into view if necessary. Text selection retains normal browser copying and native touch/keyboard fallbacks. No global custom cursor or theme-transition overlay is used.
