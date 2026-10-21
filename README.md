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
- `app.js` — story navigation, section tracking, and square pixel effects
- `trails.js` — tapered section cursor and smooth text-selection paint

The important surfaces follow the cursor. The secondary notebook button uses a clockwise brightness wave. Every surface shares a 2px / 8px square lattice and the same peak illumination. The hero contour study uses the same lattice, keeps its brightest ridges above the hover field, and links to the interactive story. Text, diagram labels, and project illustrations are masked from the decorative pixels. Reduced-motion preferences are supported.

Hover or focus a story step to change the text and move the diagram marker. Tapping and clicking remain available. There is no separate Next/Again control. The section rail moves one square between active sections with a continuous tapered tail.

The light/dark toggle applies one palette to the entire page and saves the choice locally. Theme changes are immediate. The header and back-to-top control use opaque, readable renderings. An opposite-color rendering is clipped to the exact intersection with a contrasting accent surface as it scrolls underneath; there is no midpoint threshold or timed fade. With a uniform page theme, ordinary section boundaries do not trigger color flips. The fixed side identity and section index blend against clear page gutters.

The interface draft is published on GitHub Pages at https://k-abhiram21.github.io. There is no custom-domain configuration.

Redundant edition, draft, and artwork labels are omitted. The original pixel fields, side navigation trail, scroll-responsive chrome, and hover-driven story remain.

## Interface refinements

The story pairs each hover/focus/tap step with a diagnostic readout and synchronized diagram. Arrow keys move between steps. On mobile, controls precede the story content. Project cards retain cursor-following pixels; the notebook action retains clockwise illumination. Pixel geometry and text masks are cached, and offscreen fields skip animation frames. Section entrances run once, with reduced-motion fallbacks. Dark/light mode stays immediate. The contact action links to the confirmed GitHub profile; email remains a visible placeholder.

## Visual direction

Local Manrope and Instrument Serif fonts provide the typographic system (licenses in assets/fonts). The story uses an open SVG network map: requests follow the original path, expose a failed lookup, and reroute to an alternate resolver. Packet motion plays once per relevant step. Project covers are abstract SVG studies for build, research, and contribution placeholders; they do not represent project measurements. A featured project leads into two aligned project entries. Only the hero retains the serif accent; supporting text and navigation use a readable sans serif hierarchy.

## Interface clarity

Section titles, disclosure arrows, and supporting copy have a clear hierarchy. Project details use downward disclosure arrows; in-page links use downward arrows; external GitHub links retain outward arrows. The notebook has one native disclosure with a clockwise pixel action. Section numbers match the fixed index, and anchor offsets account for the sticky header. Redundant decorative labels and repeated About counters are removed. Pixel surfaces, story hover/focus/tap behavior, section reveals, the scroll indicator, fixed-control color wipes, and instant theme switching remain.

## Cursor trails

The section rail uses a quick square head and a slower taper that settles into the active section box. Text selection keeps the browser-owned range and normal copy/context-menu behavior; a pointer-transparent SVG layer paints smoothly moving selection edges. It inverts both text and background to preserve contrast. Wrapped lines and backward selection are handled separately; selection paint stays attached during scrolling. Keyboard selection, touch selection, reduced motion, forced colors, unsupported blending, and very large ranges retain native highlighting. Animation frames stop when the trails settle. No custom global mouse cursor or animation library is used.

## Touch interaction

On phone layouts a fixed bottom bar links to Top, Process, Work, About, and Contact; safe-area padding reserves space for system gestures and the footer. A compact header holds the brand and theme toggle. Top navigation replaces the floating return button on phones so it cannot cover diagram labels. The story step controls stay below that header while its content scrolls, and tap instructions replace hover instructions. Project and notebook disclosures retain visible action labels. Mouse hover stays available on capable devices. Pixel feedback starts at the finger position and remains briefly after a quick tap; movement beyond 10px, a cancelled pointer, or a second finger cancels it so scrolling and pinch zoom stay native. The selection trail retains native touch handles.
