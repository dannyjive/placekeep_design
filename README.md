# Placekeep Website

A static, five-page website for [Placekeep](https://placekeep.com), a woman-owned architecture and design strategy practice in the Salish Sea region. Built with plain HTML, CSS, and JavaScript, with no build step, framework, or dependencies.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `approach.html` | Approach (for project owners and for design firms) |
| `about.html` | About (mission, vision, and Kirsten Dahlquist's bio and testimonials) |
| `contact.html` | Contact (three accordion forms) |

Shared files:

| File | Purpose |
| --- | --- |
| `styles.css` | All styling for every page, with desktop and mobile layouts (breakpoint at 820px) |
| `script.js` | Mobile menu, Approach tabs/accordion, and Contact accordions and form submission |

## Project structure

```
.
├── index.html
├── approach.html
├── about.html
├── contact.html
├── styles.css
├── script.js
└── README.md
```

All pages must stay in the same folder as `styles.css` and `script.js`, since they are linked with relative paths.

## Running locally

No install is needed. Either open `index.html` in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploying

Because the site is fully static, it can be hosted anywhere. For GitHub Pages:

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select your main branch and the `/ (root)` folder, and save.

Netlify, Vercel, and Cloudflare Pages also work by pointing them at the repo with no build command and the root as the publish directory.

## Setup checklist

Some content in this repo is placeholder and needs to be replaced before launch:

- [ ] **Contact forms:** Each form in `contact.html` posts to `https://formspree.io/f/YOUR_FORM_ID`. Replace this with your own form endpoint (Formspree, Netlify Forms, or your own backend). The script sends the form in the background and shows a success or error message.
- [ ] **Email address:** `hello@placekeep.com` appears in the Contact form error message in `script.js`. Replace it with the real address.
- [ ] **Portrait photo:** `about.html` uses a placeholder silhouette. Replace the `.photo` block with an `<img>` tag (a comment in the file shows where).
- [ ] **LinkedIn links:** The two social cards in `about.html` point to `#`.
- [ ] **Award links:** The two award links in Kirsten's bio in `about.html` point to `#`.
- [ ] **Approach page copy:** Five of the six "partner with you" panels and Tiers 2 and 3 on `approach.html` show "Details for this service are coming soon." Replace this with the final copy.
- [ ] **Project icons:** The three icons on the Home page are simple SVG approximations. Swap in the final artwork if you have it.
- [ ] **Favicon and social preview:** Not included yet. Add a favicon and Open Graph tags if needed.

## Design notes

**Colors** (defined as CSS variables at the top of `styles.css`)

| Name | Value |
| --- | --- |
| Purple | `#43233f` |
| Orange | `#f15f38` |
| Yellow | `#ddc532` |
| Teal (dark) | `#1a4a45` |
| Teal (light, accents) | `#2f8a82` |

These were matched by eye from the design mockups. Update the variables in `:root` if you have the official brand values.

**Typography** (loaded from Google Fonts)

- Source Sans 3 for body text and headings
- Oswald for the logotype

**Layout.** The orange panels overlap the colored section bands above and below them, using negative margins. If you change section padding, check that these overlaps still line up.

## Behavior

- **Navigation:** The Approach item has a dropdown (hover or keyboard focus on desktop, inline in the mobile menu).
- **Approach page:** The panels work as tabs on desktop (arrow keys move between them) and as an accordion on mobile.
- **Contact page:** The three forms are independent accordions, all closed by default.
- **Accessibility:** Tabs and accordions use ARIA roles and states, focus is visible, and smooth scrolling and transitions respect `prefers-reduced-motion`.

## Browser support

Designed for current versions of Chrome, Edge, Firefox, and Safari on desktop and mobile. Layout relies on CSS Grid, flexbox, and CSS custom properties.

## License

Add a license here (for example, MIT) or state that all rights are reserved.
