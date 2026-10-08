import { Component } from '@angular/core';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
})
export class HostsComponent {
  readonly hosts = [
    {
      name: 'GitHub Pages',
      fit: 'This demo',
      note: 'Free for a public repo. Copy index.html to 404.html so a refresh on /hosts still loads Angular.',
    },
    {
      name: 'Cloudflare Pages',
      fit: 'Private repo, public site',
      note: 'Strong free tier and a preview URL for each pull request.',
    },
    {
      name: 'Netlify',
      fit: 'Private repo, public site',
      note: 'A redirect of /* to /index.html with status 200 fixes the router.',
    },
    {
      name: 'Vercel',
      fit: 'Common in frontend jobs',
      note: 'Hobby plan is free. vercel.json rewrites every route to index.html.',
    },
    {
      name: 'Firebase Hosting',
      fit: 'Spark free plan',
      note: 'firebase.json rewrites to /index.html. Actions can deploy with a token while the repo stays private.',
    },
    {
      name: 'Azure Static Web Apps',
      fit: 'Free tier',
      note: 'SPA fallback is built in, and the GitHub Action is generated for you.',
    },
  ];
}
