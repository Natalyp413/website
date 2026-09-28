# Laredo Mobile Media — project notes

Handoff notes for the LMM website. Last updated 20 September 2026.

**If you are picking this up in a new Claude conversation, paste this whole file
into the chat as your first message** and attach `laredo-mobile-media-website.zip`.
That gives Claude everything it needs to continue without repeating any earlier work.

> **Moving the project to a different GitHub account?** The code was first pushed to
> an account that is not the owner's. Before the new chat, connect Claude to the
> right account at https://claude.ai/connect-github and create an empty repository
> there. Then say: *"Push this website to my GitHub repo OWNER/REPO — files are in
> the attached zip."* Claude cannot switch GitHub accounts partway through a chat,
> so this has to be a new one.

---

## Where everything lives

| Thing | Where |
|---|---|
| Website code | First pushed to https://github.com/Natalyp413/website — **being moved to the owner's own account** |
| Complete copy, account-independent | `laredo-mobile-media-website.zip` |
| Branch (also the default branch) | `claude/laredo-mobile-media-landing-w220bg` |
| Domain | laredomobilemedia.com |
| Hosting | GitHub Pages — free |

Nothing depends on any one computer. The zip alone is enough to rebuild or
redeploy the whole site on any account and any host.

**No GitHub at all?** Unzip the folder and drag it onto https://netlify.com/drop.
The site is live in seconds and the custom domain is set in Netlify's settings.

---

## Business details on the site

- **Phone** — (956) 652-2364
- **Email** — laredomobilemedia@gmail.com (the quote form sends here)
- **Service area** — Laredo, Texas only
- **Screen** — 7 ft tall × 14 ft wide, 98 sq ft, 380 × 180 pixels
- **Artwork** — LMM designs and provides it; customers may also supply their own
  at 380 × 180 px
- **Rentals** — daily, weekly and monthly. No prices shown anywhere; every tier
  routes to the quote form.

---

## What the site is

One page, built as plain HTML, CSS and JavaScript. No build step, no
frameworks, no monthly software costs. Sections, in order: hero, use-case
marquee, the screen and specs, why LMM, use cases, how it works, photo gallery,
rental tiers, FAQ, quote form, footer.

The quote form opens the customer's email app with every field filled in, so no
server is needed. `README.md` in the repo explains how to switch it to a service
that captures submissions directly, if that is ever wanted.

Four gallery photos. Five more were taken out on purpose — they are still in the
repo's history if they are ever wanted back.

---

## Done

- Site built, all copy written, real photos in place
- Logo traced from the original PDF into sharp vector files
- Contact details, screen size and service area all correct
- Domain wired up: `CNAME`, sitemap, robots.txt, social share card
- Tested: works on phones, keyboard accessible, no errors

---

## Still to do

**1. Deploy it.** Not started. Full click-by-click steps are in `README.md`
under "Deploying to laredomobilemedia.com". The short version:

- Buy the domain if not already bought
- GitHub → repo → Settings → Pages → Deploy from a branch → pick the branch
  + `/ (root)` → Save
- At the domain registrar, add four A records on `@`:
  185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- Add a CNAME record: `www` → `YOUR-GITHUB-USERNAME.github.io`
- Wait a few hours, then tick "Enforce HTTPS" in Settings → Pages

**2. Pixel pitch — unresolved.** The spec table deliberately leaves this out.
380 pixels across 14 feet works out to about an 11 mm pitch, but 16 mm was
quoted earlier. Those cannot both be right. Check the sticker on the back of a
panel, then the row can go back in.

**3. A night photo.** Every photo on the site is daytime. A shot of the board
lit up after dark is the single biggest improvement left.

**4. Google Business Profile.** Not a website task, but for a local rental
business this will bring in more calls than the site will. google.com/business

---

## Notes for whoever works on this next

- Colors, fonts and spacing are all defined as variables at the top of
  `assets/css/styles.css`. Change those and the whole page follows.
- Phone and email appear in four places. To find them all:
  `grep -rn "652-2364\|laredomobilemedia@gmail" index.html assets/js/main.js`
- The gallery grid is set to one row of four. Adding or removing photos means
  adjusting that column count so the last row does not end up with an orphan.
