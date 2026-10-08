# Angular CI/CD demo

A small public Angular 19 app used to practice a free pipeline: GitHub Actions tests and builds it, GitHub Pages hosts it, and Docker plus nginx serves the same files locally.

The longer interview notes are in [docs/cicd-interview.md](docs/cicd-interview.md). The running app has the same lesson on the Pipeline, Hosts, and Docker pages.

## Scripts

```bash
npm start
npm run test:ci
npx ng build
```

`npm start` uses the development environment. `ng build` replaces it with `src/environments/environment.prod.ts`.

## Docker

```bash
docker build -t angular-cicd-demo:local .
docker run --rm -p 8080:80 angular-cicd-demo:local
```

Then open http://localhost:8080/docker and refresh.

## GitHub Pages

The workflow in `.github/workflows/ci-cd.yml` deploys pushes to `main`. The public URL is:

`https://<github-user>.github.io/angular-cicd-demo/`

In the repository settings, the Pages source must be **GitHub Actions**.
