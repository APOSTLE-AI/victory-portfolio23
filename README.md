# Victory's portfolio site

A single, static website: no framework, no build step, no npm install.
Just HTML, CSS, and JavaScript. That's on purpose, since editing this
from a phone or from GitHub's own web editor should be just as easy as
editing it from a laptop.

Live sections: hero, about, how I work, skills, experience, books and
publishing (the Between Two Darks trilogy, the chess instruction books,
the plant science textbook), writing samples (six full pieces you can
read in place), services, and contact. There's also a dark mode toggle
and a small command palette (press `/` or tap the search icon) for
jumping straight to a section, a sample, or a book.

## Files

```
index.html      the page structure (all sections, all markup)
styles.css      the whole design system (colors, fonts, layout, dark mode)
content.js      EVERYTHING you'll actually want to edit (see below)
app.js          the logic that renders content.js and wires up interactions
assets/
  favicon.svg   the "V" mark used as the browser tab icon
  og.jpg        the image shown when the link is shared on social/chat apps
  chijioke-victory-cv.pdf   the downloadable CV
```

You should almost never need to touch `app.js` or `styles.css` just to
update your bio, add a project, or list a new book. That all lives in
`content.js`, which is written in plain English with comments.

## Previewing it before you push anything

Since there's no build step, you technically can just double click
`index.html` and it'll open in a browser. For the fetch requests and
fonts to behave properly though, it's better to serve it locally. If
you ever have a computer with Node or Python on it:

```bash
# Option A, Python (usually already installed on Mac/Linux)
python3 -m http.server 8000

# Option B, Node
npx serve .
```

Then open `http://localhost:8000` in a browser. If you're editing
straight from GitHub's web interface or the GitHub mobile app, you can
skip local previewing entirely and just check the live Vercel preview
that gets generated for every commit (see below).

## Putting it on GitHub

1. Create a new, empty repository on GitHub (no README, no .gitignore,
   don't let GitHub add anything, so it's truly empty).
2. If you're on a computer with git installed:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. If you don't have git/a computer handy: on the new repo's GitHub
   page, use "Add file" -> "Upload files" and drag in everything from
   this folder (keeping the `assets` folder structure intact). GitHub
   will commit them directly. You can keep editing files afterward
   using the pencil icon on any file, right from your phone's browser.

## Deploying on Vercel

1. Go to vercel.com and sign in with your GitHub account.
2. Click "Add New" -> "Project" and pick the repository you just
   created.
3. Vercel will ask for a framework preset. Choose "Other" (or leave it
   on its default guess). There is no build command and no output
   directory to set, this is a static site, it's already built.
4. Click Deploy. You'll get a `your-project.vercel.app` URL within a
   minute or two.
5. Every time you push a change to the `main` branch on GitHub
   afterward, Vercel redeploys automatically. No extra steps.
6. Optional: in the Vercel project's Settings -> Domains, you can add
   a custom domain later if you buy one.

Once you have your real Vercel (or custom) URL, open `index.html` and
replace the two placeholder occurrences of
`https://your-domain.example/` (in the `<link rel="canonical">` tag
and the Open Graph `<meta property="og:url">` area near the top of the
file) with your actual URL. That's the only manual step tied to
hosting.

## Content update guide

Everything below refers to sections inside `content.js`.

| Want to change...                          | Edit this in `content.js` |
|---------------------------------------------|----------------------------|
| Your bio, tagline, contact info, location    | `PROFILE` |
| The "Right now" status lines in the hero     | `PROFILE.statusLines` |
| The six "How I work" steps                   | `HOW_I_WORK` |
| Skill categories and items                   | `SKILLS` |
| The tools/platforms list                     | `TOOLS` |
| Jobs, roles, and the DRC position            | `EXPERIENCE` |
| Schools and the degree in progress           | `EDUCATION` |
| What you offer clients                       | `SERVICES` |
| Books (fiction, chess, academic)             | `BOOKS` |
| Full writing samples                         | `SAMPLES` |
| The recruiter/client toggle copy             | `RECRUITER` and `CLIENT` |

A few notes:

- **Book links**: every book in `BOOKS` currently has `link: null`,
  because there's no verified public product link yet. Once you have
  a real Kobo (or other storefront) URL for a title, just change that
  one line, e.g. `link: "https://www.kobo.com/..."`, and the site will
  automatically turn "Available via Kobo Writing Life" into a working
  button. Leave it as `null` for anything not yet linkable.
- **Adding a new writing sample**: copy an existing object inside the
  `SAMPLES` array, give it a new unique `slug`, and fill in the
  `body` array. Each block is either `{ type: "p", text: "..." }` for
  a paragraph, `{ type: "h2", text: "..." }` for a subheading, or
  `{ type: "quote", text: "..." }` for a pull quote.
- **Adding a new book**: copy an existing object inside `BOOKS`, set
  `kind` to `"fiction"`, `"chess"`, or `"academic"` (this decides
  which group and which color it shows up under), and give it a
  unique `slug`.
- **Swapping the CV**: replace `assets/chijioke-victory-cv.pdf` with a
  new file of the exact same name, and it updates everywhere
  automatically (header button, hero, CV section, contact card).
  If you rename the file instead, you'll need to update the few
  `href="assets/chijioke-victory-cv.pdf"` references in `index.html`
  and `app.js` to match.
- Never invent a number, employer, or result you can't back up.
  Leaving a field honest and modest beats a fabricated one.

## Security

This is a fully static site: no backend, no database, no user accounts,
no cookies, no API keys, nothing server-side at all. A lot of standard
web security advice (CSRF tokens, session cookie flags, protecting
against insecure direct object references, rotating secrets) exists to
protect a *backend*, and there is no backend here to protect. Adding
those things anyway would be theater, not security, so they're
deliberately left out. What's actually in place instead:

- **Security headers** (`vercel.json`): a Content-Security-Policy that
  only allows scripts and styles from this site and Google Fonts,
  `X-Frame-Options: DENY` and `frame-ancestors 'none'` (so the site
  can't be embedded in someone else's page for clickjacking),
  `X-Content-Type-Options: nosniff`, a `Referrer-Policy` that avoids
  leaking full URLs to third parties, a locked-down `Permissions-Policy`
  (camera, microphone, location, etc. are all switched off, since the
  site uses none of them), and HSTS. The same Content-Security-Policy
  is duplicated as a `<meta>` tag in `index.html` as a fallback in case
  this ever gets deployed somewhere that ignores `vercel.json`.
- **No `innerHTML` anywhere.** Every piece of text from `content.js` is
  inserted with `.textContent`, never parsed as HTML. If a future edit
  (by you, in a hurry, or by someone else's pull request) accidentally
  puts something like `<script>` inside a bio field or a book title,
  the browser will display it as literal text instead of running it.
- **Link scheme allowlisting.** Every clickable link built from
  `content.js` (book links, LinkedIn, Fiverr, email, phone) is checked
  against a short allowlist of schemes (`http:`, `https:`, `mailto:`,
  `tel:`) before it's turned into a real `href`. A bad edit that sets
  `link: "javascript:..."` gets refused and logged to the console
  instead of becoming a clickable trap. This does not, and isn't meant
  to, restrict *which* https website a link points to, since pointing
  to Kobo, LinkedIn, or Fiverr on purpose is the entire point of those
  fields.
- **`content.js` is validated and frozen at load.** If a required
  field is missing or the wrong type, that one section logs an error
  and gets skipped instead of quietly breaking the whole page. Once
  loaded, the content object is frozen so no later script on the page
  can rewrite it in memory.
- **`target="_blank"` links all carry `rel="noopener noreferrer"`**,
  so a page you link out to can't get a handle back to this tab, and
  doesn't get told what page sent it there.
- **The contact form** only ever builds a `mailto:` link client-side.
  Input is trimmed, length-capped, and stripped of stray line breaks
  before being percent-encoded into the link. There's genuinely
  nowhere for it to submit to, so there's no server-side injection
  surface to defend.

**If you ever add a real backend** (for example, a Vercel serverless
function so the contact form actually sends an email instead of
opening one), that is the point these concerns become real. At that
point: put any API key in a Vercel Environment Variable, never in the
repo; validate and rate-limit that endpoint server-side, since it will
be exposed to the whole internet, not just this page; and reconsider
CSP's `connect-src` and `form-action` directives so the form is
allowed to talk to it.

## Why no framework

A framework like Next.js is genuinely nice, but it needs Node.js,
`npm install`, and a build step every time you want to see a change,
which is a real obstacle if you're mostly editing from a phone or a
borrowed computer. Plain HTML/CSS/JS has none of that: edit a file,
commit, and Vercel redeploys it as-is. If your situation changes later
and you want a framework-based rebuild, this content structure
(`content.js`) can be ported over almost as-is.
