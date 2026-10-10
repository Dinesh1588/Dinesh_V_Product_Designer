# Dinesh V — Product Designer Portfolio v3

A dark-first, animation-rich Product Designer portfolio built as a Vite + TypeScript project.

## Stack
- HTML5
- CSS3
- TypeScript
- Vite
- GSAP + ScrollTrigger
- Three.js / WebGL
- SVG
- Optional Rive and Lottie runtime dependencies

## Theme
- Dark mode is the first/default theme.
- Light mode is available through the theme toggle.
- Orange primary: #F97316
- Dark hover: #EA580C
- Light orange: #FB923C

## Portfolio hierarchy
Home → Selected Work → Current Work → How I Work → About → Playground → Toolkit → Contact.
Navigation stays simple: Work, About, Playground, Contact.

## Animation
- Hero text reveal
- Three.js interactive hero object
- Mouse-responsive 3D scene
- Magnetic buttons
- Custom cursor on desktop
- Scroll-triggered reveals
- Scroll-driven process line
- Project image parallax / pointer tilt
- Marquee motion
- Playground motion studies
- Reduced-motion accessibility support

## Source structure
`src/components` contains UI interaction modules.
`src/animations` contains GSAP motion.
`src/three` contains WebGL/Three.js.
`src/styles` contains separated design tokens, layout, components, typography, animation and responsive CSS.
`src/data` contains project/site data.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

No confidential Mobitech product screens are included. Professional work is intentionally described at a high level.


## Updated homepage hierarchy (October 2026)
1. Hero
2. Toolkit (icon-led)
3. Current professional work
4. Selected projects
5. How I work
6. About
7. Playground
8. Contact

The profile portrait is a transparent PNG cutout with extra canvas breathing room. The hero heading now remains visible even if animation JavaScript fails on a production host.

## Latest update — 9 Oct 2026
- Added a floating Back to Top control.
- Added an animated hero phrase rotator with five value-focused lines; the initial phrase remains visible if JavaScript does not initialize.
- Replaced generic toolkit category symbols with branded app/tool logo marks and labels.
- Improved mobile hero/profile sizing and text wrapping to reduce awkward portrait placement and headline overflow.
- Updated hero chips to “INSIGHT → IMPACT” and “THINK → SHIP”, with subtle continuous motion.
- Kept the homepage order: Hero → Toolkit → Current Work → Selected Projects → How I Work → About → Playground → Contact.

Files changed in this update: `index.html`, `src/main.ts`, `src/animations/gsap.ts`, `src/styles/components.css`, `src/styles/responsive.css`.


### Latest corrections (October 2026)
- Restored the hero chips to “DESIGN → BUILD” and “USER → PRODUCT”.
- Updated Photoshop, Illustrator and CSS3 icon sources and added text-mark fallbacks if a logo CDN fails.
- Added a UX Research card to the Playground section.


## Latest portfolio refinements
- Removed GSAP and TypeScript from the visible Toolkit cards; these remain implementation technologies, not design-tool claims.
- Added a dedicated Design + Development section after Current Work to explain implementation awareness once, without repeating it in About.
- Updated About to a portrait-left editorial layout with concise story and quick experience/education stats.
- Selected projects now prioritize Aalayam, Ghost of Tsushima, and Onam Food App. Signature Cuts and Travel App are removed from the homepage.
- Added a restrained orange ember effect across the page; it is disabled when reduced motion is preferred.
- Added a DV favicon and social preview metadata.
