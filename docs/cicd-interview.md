# Angular CI/CD interview notes

This app is the practice project. The private `studyMaterial` repo stays private. GitHub Pages on a free account publishes a **public** repository, so the pipeline lives here.

Angular 19 is used because this PC has Node 20.18.1. Angular 22 requires Node 22.22.3 or newer. The pipeline shape is the same on either version.

## The flow

1. You push a commit or open a pull request.
2. GitHub Actions checks out that commit on a clean Ubuntu machine.
3. `npm ci` installs exactly what `package-lock.json` records.
4. `npm run test:ci` runs Karma in Chrome Headless. Watch mode is off, or the job never finishes.
5. `ng build` writes static files to `dist/angular-cicd-demo/browser`. The production configuration swaps `environment.ts` for `environment.prod.ts`.
6. A pull request stops there. A push to `main` uploads that folder to GitHub Pages.
7. The site is `https://<github-user>.github.io/angular-cicd-demo/`.

`ng serve` is only for your laptop. Production serves the built files.

## Why two files exist for GitHub Pages

`<base href="/">` is correct on `localhost`. On project Pages the app lives under `/angular-cicd-demo/`, so the workflow builds with:

```bash
npx ng build --base-href /angular-cicd-demo/
```

GitHub Pages has no rewrite rule. Opening `/angular-cicd-demo/docker` and refreshing would 404. The workflow copies `index.html` to `404.html`, and Pages serves that file for unknown paths. Angular then reads the real URL and shows the Docker page.

`.nojekyll` stops GitHub from ignoring files that start with `_`, which Angular file names can do.

## Docker, on the same build

```bash
docker build -t angular-cicd-demo:local .
docker run --rm -p 8080:80 angular-cicd-demo:local
```

Open `http://localhost:8080/docker` and refresh.

- Stage 1 (`node:20-bookworm`) compiles the app. Base href is `/` because the container owns the host.
- Stage 2 (`nginx:1.27-alpine`) contains only nginx and the browser folder.
- `try_files $uri $uri/ /index.html;` is the container version of the Pages `404.html` trick.
- Docker Desktop is free for personal use. That is enough for the interview. A forever-free public container URL is less reliable than GitHub Pages.

Say this: the running container does not include the Angular compiler or `node_modules`.

## Practice steps

1. Change a sentence on the Pipeline page, on a branch, and open a pull request. The build job runs. The deploy job does not.
2. Merge to `main`. Wait for the deploy job. Click Pipeline, Hosts, and Docker on the Pages URL.
3. Refresh on `/angular-cicd-demo/docker`. The Docker page must remain.
4. On the Pages site, the banner says **Production build** and the API placeholder is `https://api.example.com`. On `ng serve`, it says **Development server** and `http://localhost:3000/api`.
5. Break `app.component.spec.ts` on purpose and push. Deploy must not run. Put the spec back.
6. Build and run the Docker image. Refresh `http://localhost:8080/hosts`.

There is no API in this demo. `apiUrl` shows where a real app would point `environment.prod.ts` after a separate backend deploy.

## Sample answer

“A pull request triggers GitHub Actions. The job uses Node 20, installs with npm ci, runs unit tests headlessly, and runs a production build. I do not deploy from a pull request. After merge, the same workflow uploads `dist/angular-cicd-demo/browser` to GitHub Pages with the repository name as the base href, and a 404.html copy so the Angular router survives refresh. I also have a multi-stage Docker image: Node builds, nginx serves, and the nginx config falls back to index.html. I would tag that image with the commit SHA so rollback is a redeploy of a known tag. Secrets never go in the repo.”

## Private repo versus public site

| Situation | Free? | What people see |
| --- | --- | --- |
| GitHub Actions on a private repo | Yes, with a smaller minute quota | Nothing, until you deploy somewhere |
| GitHub Pages on a private repo | No. Needs GitHub Pro, and the site is still public | The website |
| GitHub Pages on this public repo | Yes | The website and the source |
| Cloudflare Pages, Netlify, Vercel, Firebase Hosting, Azure Static Web Apps | Free tiers can build a private repo | The website, not the source |

AWS S3 plus CloudFront, and Google Cloud Storage, are normal production choices. Their free allowance is a quota or a trial, not a permanent no-billing setup.

## Other tools, same stages

Jenkins, GitLab CI, Azure Pipelines, CircleCI, and Bitbucket Pipelines use different YAML. The stages do not change: trigger, checkout, cache, install, test, build, artifact, deploy.

Container hosts if someone asks beyond local Docker:

- GitHub Container Registry (`ghcr.io`) for a public image, free.
- Render free web service, from the same Dockerfile. It sleeps when idle.
- Google Cloud Run, a real production pattern, often asks for a billing account.
- Fly.io, a small allowance, card required.

## Commands on your machine

```bash
npm start
npm run test:ci
npx ng build
docker build -t angular-cicd-demo:local .
docker run --rm -p 8080:80 angular-cicd-demo:local
```
