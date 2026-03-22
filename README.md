# project-keely-dodd

**Live site:** https://newanforbi.github.io/project-keely-dodd/

An interactive administrative accountability dashboard built with React 18 + Vite and deployed to GitHub Pages. It presents a structured legal and procedural analysis of CDCR parole retention actions, organized into four navigable sections.

---

## Sections

| Tab | Description |
|-----|-------------|
| **CDCR Hierarchy** | Visual org chart of the CDCR command chain from the Secretary down to the supervising Parole Agent, highlighting the Northern Region Administrator's signatory role |
| **Disputed Record** | Full breakdown of CDCR Form 1502-DR (finalized Nov 19, 2025) — case metadata, the three-tier review chain, and the legal grounds for challenging the retention as unlawful |
| **Avenues of Redress** | Eight categorized remedies: Internal grievance (CDCR 602-1), Staff Misconduct / OIA referral, OIG complaint, Office of the Ombudsman, State Habeas Corpus, Writ of Mandate, Federal § 1983, and the Government Claims Act — each with expandable step-by-step procedures |
| **Strategic Sequence** | Four-phase action timeline showing the correct order of exhaustion, external oversight, judicial intervention, and systemic legal advocacy |

---

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| React | 18.3 | UI framework |
| Vite | 5.4 | Build tool & dev server |
| @vitejs/plugin-react | 4.3 | Babel-powered Fast Refresh |
| GitHub Actions | — | CI/CD |
| GitHub Pages | — | Hosting |

No external CSS framework or router — all styling is inline React with Google Fonts (Inter, JetBrains Mono, Playfair Display).

---

## Local Development

```bash
npm install
npm run dev        # starts dev server at http://localhost:5173
```

### Other scripts

```bash
npm run build      # production build → dist/
npm run preview    # locally preview the production build
```

---

## Deployment

The site deploys automatically via GitHub Actions on every push to `main` or `master` (see `.github/workflows/deploy.yml`).

The workflow:
1. Checks out the repo
2. Installs dependencies with `npm ci`
3. Runs `npm run build` (outputs to `dist/`)
4. Uploads `dist/` as a Pages artifact
5. Deploys to GitHub Pages

**GitHub Pages must be configured to use "GitHub Actions" as the source** — repo Settings → Pages → Source → GitHub Actions.

The Vite base path is set to `/project-keely-dodd/` in `vite.config.js` to match the GitHub Pages subdirectory URL.

---

## Project Structure

```
project-keely-dodd/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD
├── src/
│   ├── App.jsx              # All four dashboard sections + data
│   └── main.jsx             # React root mount
├── index.html               # Vite entry point
├── vite.config.js           # Base path config
├── package.json
└── package-lock.json
```

---

## Subject Matter

The dashboard is a legal research and advocacy tool for the case of **Brendan N. Newanforbi (CDC #BF3571)**, whose parole discharge was denied via CDCR Form 1502-DR on November 19, 2025. It documents:

- The command accountability chain within CDCR's Division of Adult Parole Operations (DAPO)
- The specific factual and statutory grounds challenging the retention decision under PC 3000(b)(5)(B) and 15 CCR § 3722
- The full procedural roadmap from mandatory administrative exhaustion through potential federal civil rights litigation (42 U.S.C. § 1983)
