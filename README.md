# Ford Tailgate Rules Hoster

Hosts the official rules pages for the Ford tailgate promotion at
**https://fordtailgaterules.com**.

The site is plain static HTML — the rules documents exported from Google Docs —
served by GitHub Pages.

## How hosting works

Everything under `public/` **is** the website:

| URL | File served |
|---|---|
| `/` | `public/index.html` |
| `/en/` | `public/en/index.html` |
| `/es/` | `public/es/index.html` |
| anything else | `public/404.html` → instantly redirects to `/` |

- **Deploys:** `.github/workflows/deploy.yml` runs on every push to `main`.
  It uploads the `public/` folder as a Pages artifact and deploys it. No build
  step — what's in `public/` is exactly what goes live (usually within a
  minute or two of pushing).
- **Custom domain:** `public/CNAME` contains `fordtailgaterules.com`, which
  tells GitHub Pages to serve the site on that domain. Don't delete this file
  or the custom domain gets unlinked.
- **Catch-all routing:** GitHub Pages serves `404.html` for any path that
  doesn't match a real file. Ours is a tiny page that immediately redirects to
  the home page (via meta refresh + JS), so every undefined URL lands on `/`
  while the defined paths above keep working.

## Updating the site

1. Edit the HTML in `public/` (e.g. replace `public/en/index.html` with a new
   export of the rules doc).
2. Commit and push to `main`.
3. The GitHub Actions workflow deploys automatically — check the **Actions**
   tab on the repo if the change doesn't appear.

## Legacy Express server (Heroku)

`index.js` + `Procfile` are from the original Heroku deployment
(`https://git.heroku.com/fordtailgaterules.git` remote). It's a small Express
app that serves the same `public/` folder with the same routes, plus the same
catch-all fallback to the home page. It is **not** used by the GitHub Pages
site, but is kept in case the Heroku app is ever needed again.

Run it locally:

```bash
npm install
npm start          # serves on http://localhost:8000 (or $PORT)
```
