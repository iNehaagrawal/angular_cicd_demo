import { Routes } from '@angular/router';
import { DockerComponent } from './docker/docker.component';
import { HostsComponent } from './hosts/hosts.component';
import { PipelineComponent } from './pipeline/pipeline.component';

export const routes: Routes = [
  { path: '', component: PipelineComponent },
  { path: 'hosts', component: HostsComponent },
  { path: 'docker', component: DockerComponent },
  { path: '**', redirectTo: '' },
];
