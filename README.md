# Laredo Mobile Media, LLC — landing page

A single-page marketing site for LMM's mobile LED billboard rental business.

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies —
open `index.html` and it works. That means it deploys to GitHub Pages, Netlify,
Vercel, Cloudflare Pages or plain shared hosting with nothing to configure.

```
index.html                  the whole page
assets/css/styles.css       all styling (design tokens live at the top)
assets/js/main.js           nav, scroll reveal, gallery lightbox, quote form
assets/img/                 logo variants, hero, social card, favicon
assets/img/gallery/         the nine gallery photos
```

## Preview it locally

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

---

## Before you put this live

Everything on the page is real and current:

- **Phone** — (956) 652-2364
- **Email** — laredomobilemedia@gmail.com
- **Screen** — 19.9 ft × 9.4 ft (~188 sq ft), 380 × 180 px, 16 mm pitch, 2.11 : 1

The only thing left is the domain. Once you have it, update `<link rel="canonical">`
and `og:url` near the top of `index.html`.

If the phone or email ever changes, they live in four places — the contact section and
footer of `index.html`, the JSON-LD block at the bottom of that file, and
`CONTACT_EMAIL` at the top of `assets/js/main.js`:

```bash
grep -rn "652-2364\|laredomobilemedia@gmail" index.html assets/js/main.js
```

### Screen specs, for reference

380 × 180 px at a 16 mm pitch works out to 6080 × 2880 mm — 19.95 ft × 9.45 ft, a
2.111 : 1 ratio. That is 19 × 9 panels of 320 mm (the module sold as "1 foot").
**Customer artwork should be 380 × 180 px.** That figure is quoted in the FAQ.

## Wiring up the quote form

Out of the box the form opens the visitor's email app with every field filled in.
That works everywhere and needs no server, but you only hear about a lead if the
visitor actually hits send in their mail client.

To collect submissions directly instead, use a form service — for example
[Formspree](https://formspree.io):

1. Add the endpoint and method to the `<form>` tag in `index.html`:
   ```html
   <form class="quote" id="quoteForm" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
2. In `assets/js/main.js`, delete the `e.preventDefault();` line inside the submit
   handler and the `window.location.href = 'mailto:' ...` block. Keep the validation
   above it — the browser will post the form normally once it passes.

On Netlify it is simpler still: add `netlify` and `name="quote"` to the `<form>` tag
and remove the same two pieces.

## Swapping the photos

Replace files in `assets/img/gallery/` keeping the same names, or edit the gallery
markup in `index.html`. Each photo is a `<button class="shot">` carrying:

- `data-src` — the full-size image the lightbox opens
- `data-caption` — the caption under it
- an `<img>` with real `alt` text (please keep this — it is what screen readers and
  Google read)

Photos are served at 1000px wide, JPEG quality ~78. Anything much larger just slows
the page down.

## Changing the look

Every colour, font and radius is a custom property at the top of `styles.css`:

```css
:root {
  --bg: #08080a;
  --fg: #f5f5f7;
  --c1: #35e3f5;   /* LED cyan    */
  --c2: #6c7bff;   /* LED blue    */
  --c3: #ff4fa3;   /* LED magenta */
  ...
}
```

The three accent colours feed one gradient (`--grad`) used for the headline
highlight, the step numbers, section eyebrows and hover underlines. Change those
three and the whole page follows.

## Deploying to GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch**, pick the
branch and `/ (root)`. The site is live a minute later; add the custom domain on the
same screen.

## Notes

- Works down to 320px wide; nav collapses to a menu under 860px.
- Honours `prefers-reduced-motion` — all animation stops for visitors who ask for it.
- Keyboard accessible throughout, including the gallery lightbox (arrows navigate,
  Escape closes).
- The logo files in `assets/img/` were traced from the original PDF, so they stay
  sharp at any size. `logo-light.svg` is for dark backgrounds, `logo-dark.svg` for
  light ones.
