# LOST SPRING — Childhood Beyond Survival
Class XII English project on "Lost Spring: Stories of Stolen Childhood" by Anees Jung.
Plain HTML + CSS + JavaScript, with Three.js for the 3D scenes. No backend.

## Run it
1. Unzip the folder.
2. Easiest: double-click `index.html`. It works from a file.
   Better (fonts and 3D load reliably): open a terminal in the folder and run
   `python3 -m http.server 8000`, then visit http://localhost:8000
3. You need internet the first time: Three.js loads from cdnjs.cloudflare.com and fonts from Google Fonts.
   Without them the site still works, with a flat background instead of 3D and system fonts.
   To go fully offline, download three.min.js (r128) into `js/vendor/` and change the `<script src>` in each page.

## Folder map
    index.html saheb.html mukesh.html slum-life.html education.html child-labour.html
    author.html lost-spring.html research.html survey.html solutions.html conclusion.html
    gallery.html bibliography.html
    css/style.css  css/animations.css
    js/main.js (nav, widgets)  js/animations.js (scroll, tilt, reveal)
    js/three-scene.js (7 3D scenes)  js/charts.js (bar/pie/cards)  js/survey-data.js (YOUR results)
    assets/images  assets/icons  assets/drawings

## Where each part of the brief lives
| Brief page | File |
|---|---|
| 1 Home | index.html |
| 2 Saheb / 3 Mukesh | saheb.html / mukesh.html |
| 4 Slum children + 5 Limited world | slum-life.html |
| 6 Education | education.html |
| 7 Child labour + 11 Darker side of society | child-labour.html |
| 8 Author | author.html |
| 9 Meaning of the title | lost-spring.html |
| 10 My perspective + 17 Action | solutions.html |
| 12 Seemapuri then/now + 13 Slums across India + 14 Research papers | research.html |
| 15 Survey | survey.html |
| 16 Images & drawings | gallery.html |
| 18 Conclusion / 19 Bibliography | conclusion.html / bibliography.html |

## Things YOU need to fill in (marked with [ADD ...] on the pages)
- Survey: enter real counts in `js/survey-data.js`. Until then the page says "Survey data will be added here".
- Seemapuri "Now" data on research.html (housing, education, water, sanitation, employment, infrastructure).
- Bengaluru slum figure, ILO fact-sheet year, access dates, links to the Acts, and your name on the drawings.
- Any photos, with caption, source and licence.

## Verified figures used (all with source on the page)
- ILO–UNICEF 2025: ~138 million children in child labour in 2024, ~54 million hazardous.
- ILO fact sheet / Census 2011: 259.6M children 5–14; 10.1M working (3.9%); >42.7M out of school; -2.6M vs 2001.
- MoHUA/NBO Slums in India compendium 2015: 65,494,604 slum residents (2011) and slum population for five cities.
Please re-check each against the linked source before you submit.

## Accessibility and performance
Semantic HTML, skip link, keyboard-operable widgets, visible focus, `prefers-reduced-motion` support (3D idles,
pinned scenes become stacked sections), low-poly scenes, capped pixel ratio, only visible canvases render.
