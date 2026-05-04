import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'mfe-policies',
    loadChildren: () =>
      loadRemoteModule('mfe-policies', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'mfe-reference-data',
    loadChildren: () =>
      loadRemoteModule('mfe-reference-data', './Routes').then(
        (m) => m.remoteRoutes
      ),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
