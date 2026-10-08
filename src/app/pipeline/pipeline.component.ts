import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pipeline',
  imports: [RouterLink],
  templateUrl: './pipeline.component.html',
})
export class PipelineComponent {
  readonly production = environment.production;
  readonly apiUrl = environment.apiUrl;
  readonly stages = [
    { name: 'Trigger', detail: 'A pull request runs checks. A push to main also deploys.' },
    { name: 'Checkout', detail: 'GitHub Actions clones the exact commit, not your laptop.' },
    { name: 'Install', detail: 'npm ci installs the lockfile. npm install can drift.' },
    { name: 'Test', detail: 'Karma runs in Chrome Headless. A red test stops the pipeline.' },
    { name: 'Build', detail: 'ng build uses the production configuration and environment.prod.ts.' },
    { name: 'Deploy', detail: 'The browser folder is published to GitHub Pages.' },
  ];
}
