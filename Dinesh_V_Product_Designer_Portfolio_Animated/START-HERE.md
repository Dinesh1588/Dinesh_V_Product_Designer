# Start Here — Dinesh V Portfolio

1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL printed by Vite.
5. Before deployment, run `npm run build`.

## Homepage flow
Hero → Toolkit → Current Work → Selected Projects → How I Work → About → Playground → Contact.

The homepage uses a transparent PNG profile cutout. The hero headline is visible even if the animation script does not run, avoiding invisible text on production hosting.

## Deploy
Import this folder into Vercel or Netlify as a Vite project. Build command: `npm run build`; output directory: `dist`.

## Latest UI update
- Back-to-top button appears after scrolling.
- Hero line automatically rotates between five concise statements.
- Toolkit uses recognizable product logo marks.
- Mobile portrait sizing and heading wrapping have been adjusted.
- Hero insight/build chips float subtly to keep the hero alive without distracting from the headline.

If applying only the latest changes to an existing GitHub/Vercel repo, replace these five files while keeping the rest of the folder structure unchanged:
`index.html`, `src/main.ts`, `src/animations/gsap.ts`, `src/styles/components.css`, `src/styles/responsive.css`.


Latest update: hero chips restored, Photoshop/Illustrator/CSS3 logo fallbacks added, and UX Research added to Playground.


Latest update: Toolkit excludes GSAP and TypeScript as visible tools. The homepage order is Toolkit → Current Work → Selected Work → How I Work → Design + Development → About → Playground → Contact. A subtle ember effect is disabled for reduced-motion preferences.
