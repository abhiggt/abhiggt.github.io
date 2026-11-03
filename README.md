# abhiggt.github.io

Abhijeet Chaudhuri's personal site. Light by day in India (06:30 to 18:30 IST), dark by night, with a toggle at the top right.

## What's in here

```
index.html                  the page
404.html                    shown for any address that doesn't exist
favicon.svg                 the /अ tab icon
assets/css/style.css        all styles, including the font declarations
assets/js/main.js           everything that moves: paper plane, rocket, astronaut, stickers, stars
assets/fonts/               Redaction 35, Reenie Beanie, Doto, Yatra One (all open source, OFL)
assets/photos/              the four polaroids (640 px webp)
assets/og.png               the link preview image (1200 × 630)
assets/stickers/            optional: real sticker images (see PROMPTS.md)
assets/models/              optional: astronaut.glb (see below)
PROMPTS.md                  prompts for generating the side quest graphics
.gitignore                  keeps OS and editor clutter out of the repo
```

Loaded from CDNs, so there's nothing to install: three.js r128 (cdnjs), its GLTFLoader (jsDelivr), and Geist and Geist Mono (Google Fonts).

## Publish it

1. On GitHub, create a **public** repository named exactly `abhiggt.github.io`.
2. Upload everything in this folder, keeping the folders as they are. Drag the whole folder's contents into **Add file → Upload files**, then commit. If the dotfile `.gitignore` doesn't show up in your file picker, you can skip it.
3. Go to **Settings → Pages**, set **Source: Deploy from a branch**, then **Branch: main** and **/ (root)**, and save.
4. In a minute or two the site is live at https://abhiggt.github.io

To update it later, upload the changed files again (same names, same folders) and commit.

To try it locally first, run `python3 -m http.server` in this folder and open http://localhost:8000. Opening `index.html` directly from disk mostly works too, but the optional astronaut model needs a server.

## Things you'll probably want to edit

All in `assets/js/main.js` unless noted.

| What | Where |
| --- | --- |
| Projects (names, links, descriptions) | `const PROJECTS = [` near the top |
| "about N years before X did" in the hero | `const ARRIVALS = [` |
| Headline word swaps | `const WORDS_A` and `const WORDS_B` |
| Sticker sizes and starting positions | `const STK = {` |
| Swap drawn stickers for real images | `const STICKER_ART = {` (see PROMPTS.md) |
| Copy: hero, college, how I work, contact | `index.html` |
| The "now" line | search `class="now"` in `index.html`; update it every month or two |
| Polaroids (photos and captions) | the `<section class="snaps">` block in `index.html`; photos live in `assets/photos/` |
| Colours, spacing, fonts | the `:root` block at the top of `assets/css/style.css` |
| Résumé link (the card after the rocket launch) | search `framerusercontent` in `assets/js/main.js` and `index.html` |

## The astronaut

The night-mode astronaut is built in code. For a more detailed one, download the free model from
https://sketchfab.com/3d-models/astronaut-f7f0c153f6e4423a99133958847c2b9c
in **glTF binary (.glb)** format and save it as `assets/models/astronaut.glb`. The page picks it up automatically. Keep it under about 5 MB, since GitHub Pages serves it to every night-time visitor. Credit the author in the footer if the licence asks for it.

## Hidden things

- Tap the 🏀 in the college section for a three-pointer (with a drum hit), and the 🎸 for a strum.
- Hover "dark" in the side quests label at night for bats.
- Drag the stickers around by day. At night, drag the astronaut, or triple-tap him to cut his tether.
- Drag the polaroids. By day they drop in with gravity; at night they float and you can fling them.
- Hover the crayon line in the footer and hold still on a colour to give your cursor that colour.
