# Side quest graphics: prompts

The five side quest stickers on the light-mode page are drawn in code (SVG). If you want real photographic or illustrated versions, generate them with these prompts and drop them in. The page swaps them in automatically.

## How to use them

1. Generate each image with the prompt below, in any image tool (Midjourney, Ideogram, ChatGPT images, Firefly, Recraft).
2. Remove the background so it's a **transparent PNG**. Most tools can't output transparency directly. Generate on plain white, then use remove.bg, Photoshop or Figma's "Remove background".
3. Crop tight to the object, export at about **800 px** on the long side and compress it (squoosh.app, aim for under 150 KB).
4. Save into `assets/stickers/` with these names: `keyaster.png`, `brinky.png`, `etyms.png`, `linkmery.png`, `udo.png`.
5. Open `assets/js/main.js`, find `const STICKER_ART = {};` and list the ones you made:

   ```js
   const STICKER_ART = {
     key: 'assets/stickers/keyaster.png',
     brk: 'assets/stickers/brinky.png',
     ety: 'assets/stickers/etyms.png',
     lkm: 'assets/stickers/linkmery.png',
     udo: 'assets/stickers/udo.png',
   };
   ```

   Any you leave out keep their drawn version. The page adds its own soft shadow, tilt and drag, so **don't bake a shadow into the image**.

## Shared style line

Add this to the end of every prompt so the set looks like it belongs together:

> isolated object, shot from directly above with a very slight angle, soft even daylight from the top left, true-to-life materials and textures, no drop shadow, no background, no extra objects, no hands, crisp focus, high detail, warm natural colour

---

## 1. keyaster: an India Post stamp

> A single vintage Indian postage stamp, perforated white edges, deep indigo printed field with a thin gold double border. Top left reads "भारत", top right reads "INDIA", a small "₹5" value. In the centre, a small gold line-drawn constellation of six stars joined by thin lines. Bottom text in a friendly rounded display face: "keyaster". Slightly aged paper, faint ink texture, tiny printing imperfections. Flat, square-on.

Text to check after generating: भारत, INDIA, ₹5, keyaster. Image tools often misspell, so fix any typos in Figma or Photoshop.

## 2. brinky: a soda bottle cap

> A single used metal crown bottle cap from an old Indian soda bottle, seen from slightly above so the crimped, fluted steel skirt is visible. Domed top printed in red and cream: a red ring with "SIP · STRETCH · SIT UP" around it, a cream centre with the word "brinky" in a bold red retro script. Real brushed steel on the skirt, slight scuffs and a tiny dent, a soft specular highlight on the top.

## 3. etyms: a torn newspaper scrap

> A small scrap torn from an old broadsheet newspaper, ragged torn edges with white paper fibres showing, slightly yellowed newsprint with visible grain. A small column heading "WORD HISTORY · etyms", then a bold serif headline "apricity" with "n., archaic" beside it, followed by five or six lines of small justified serif body text about the word's origin. The words at the top and bottom edges are cut off by the tear. Lying flat, very slightly curled.

The body text can be gibberish in the image. If you want it readable, generate without body text and type it in afterwards:
"From the Latin apricus, 'warmed by the sun'. A dictionary of 1623 lists it as 'sunne-shine in winter', and then the word all but vanished."

## 4. linkmery: a library key

> An old brass skeleton key with an ornate three-lobed clover bow, a turned collar and a long round shaft ending in a cut bit, warm polished brass with darker patina in the recesses. A small manila paper luggage tag with a reinforced eyelet is tied to the bow with thin cotton string. The tag reads "CITY LIBRARY · 42" in small typewriter capitals and "linkmery" handwritten in black ink below.

## 5. UDO: a postmark sticker

> A round cream sticker printed like an Indian Post Office postmark in slightly uneven navy ink. Circular text around the edge reads "CHIDIYA UDD ✦ NEW DELHI ✦ 110045 ✦", two thin concentric rings, wavy cancellation lines, a small orange flying bird in the centre and the word "UDO" in bold rounded letters below it. White die-cut border, subtle ink spread and paper grain.

---

## Optional: a new link preview image

`assets/og.png` is already included and wired up (it's what shows when the link is shared on WhatsApp, LinkedIn or X). To replace it, generate a new one at 1200 × 630 and save it over the same file.

> A clean editorial banner, 1200 by 630. A sheet of white ruled notebook paper slightly rotated on a warm cream background (#FCF5E9), with a small folded paper plane at its corner. Large serif headline on the paper: "I turn blank pages into things people remember." with the last word in handwritten blue ink. Small text in the corner: "abhiggt.github.io". Soft daylight, gentle paper shadow, lots of breathing room.
