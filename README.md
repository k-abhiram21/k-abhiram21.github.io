# Portfolio interface draft

A single static page built with HTML, CSS, and JavaScript. Project, biography, and email copy is placeholder content for layout review. The interactive DNS investigation is an explicitly illustrative example, not a claim about Abhiram’s work.

## Preview locally

From this directory:

```sh
python3 -m http.server 8877 --bind 127.0.0.1
```

Open `http://127.0.0.1:8877`. No dependencies or build step are needed.

- `index.html` — page structure and placeholder content
- `styles.css` — monochrome layout, responsive styles, and diagrams
- `app.js` — story navigation, section indicator, and square pixel effects

The important surfaces follow the cursor. The secondary notebook button uses a clockwise brightness wave. Every surface shares a 2px / 8px square lattice and the same peak illumination. The hero contour study uses the same lattice, keeps its brightest ridges above the hover field, and links to the interactive story. Text, diagram labels, and project illustrations are masked from the decorative pixels. Reduced-motion preferences are supported.

Hover or focus a story step to change the text and move the diagram marker. Tapping and clicking remain available. There is no separate Next/Again control. The section rail has a direction-aware pixel trail tied to scroll progress.

The light/dark toggle applies one palette to the entire page and saves the choice locally. Theme changes are immediate. The header and back-to-top control use opaque, readable renderings. An opposite-color rendering is clipped to the exact intersection with a contrasting accent surface as it scrolls underneath; there is no midpoint threshold or timed fade. With a uniform page theme, ordinary section boundaries do not trigger color flips. The fixed side identity and section index blend against clear page gutters.

This draft has not been published. There is no custom-domain configuration.

Redundant edition, draft, and artwork labels are omitted. The original pixel fields, side navigation trail, scroll-responsive chrome, and hover-driven story remain.

## Interface refinements

The story pairs each hover/focus/tap step with a diagnostic readout and synchronized diagram. Arrow keys move between steps. On mobile, controls precede the story content. Project cards retain cursor-following pixels; the notebook action retains clockwise illumination. Pixel geometry and text masks are cached, and offscreen fields skip animation frames. Section entrances run once, with reduced-motion fallbacks. Dark/light mode stays immediate. The contact action links to the confirmed GitHub profile; email remains a visible placeholder.

## Visual direction

Local Manrope and Instrument Serif fonts provide the typographic system (licenses in assets/fonts). The story uses an open SVG network map: requests follow the original path, expose a failed lookup, and reroute to an alternate resolver. Packet motion plays once per relevant step. Project covers are abstract SVG studies for build, research, and contribution placeholders; they do not represent project measurements. The work layout uses an asymmetric image sequence rather than repeated bordered cards.
