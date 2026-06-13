# Sriram Manikanth — Portfolio & Resume

Interactive portfolio and ATS-friendly resume for Sriram Manikanth (MTS at Salesforce). Features live playground demos of NextOps, Cosmic AI, SSP, and Ops-Sage.

**Live site:** [srirammanikanth.dev](https://srirammanikanth.dev) (configure your domain in Cloudflare)

## Stack

- Vite 5, vanilla HTML/CSS/JS
- Lucide icons (bundled via npm)
- Resume content: `content/resume.json` (single source for ATS sheet + copy-to-clipboard)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

Output directory: `dist/`

## Deploy to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push this repo to GitHub.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select repository `Srirammkm/sriram-portfolio-resume`.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 20 (Environment variables → `NODE_VERSION=20` if needed)
5. Deploy. Every push to `master` triggers a new build.

### Option B — Wrangler CLI

```bash
npm run build
npx wrangler pages deploy dist --project-name=sriram-portfolio
```

### Custom domain (Cloudflare)

1. In your Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter your domain (e.g. `srirammanikanth.dev` or `www.srirammanikanth.dev`).
3. If the domain is already on Cloudflare, DNS records are added automatically.
4. Update `content/resume.json` → `site.url` and regenerate `public/sitemap.xml` / `public/robots.txt` if your domain differs from `srirammanikanth.dev`.

### SSL

Cloudflare provides free SSL. Ensure **SSL/TLS** mode is **Full** or **Full (strict)**.

## Configuration

| File | Purpose |
|------|---------|
| `content/resume.json` | Profile, summary, experience, skills — drives ATS view and copy text |
| `content/resume.json` → `site.url` | Canonical URL, Open Graph, sitemap |
| `content/resume.json` → `site.analyticsToken` | Cloudflare Web Analytics beacon token (optional) |

To enable Cloudflare Web Analytics: Dashboard → **Analytics** → **Web Analytics** → add site → copy token into `site.analyticsToken`.

## Project structure

```
├── content/resume.json      # Resume data (edit here)
├── public/                  # Static assets (copied to dist root)
│   ├── assets/profile.jpg
│   ├── assets/logos/
│   ├── _headers             # Cloudflare Pages headers
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.js              # App entry
│   ├── resume.js            # ATS render + markdown export
│   ├── icons.js             # Lucide setup
│   └── lab/automation-lab.js  # Interactive playground (lazy-loaded)
├── index.html
├── styles.css
└── vite.config.js
```

## CI

GitHub Actions runs `npm run build` on push/PR (`.github/workflows/ci.yml`).

## License

ISC
