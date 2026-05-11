import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const appRoutes: Route[] = [
  {
    path: 'claims',
    loadChildren: () =>
      loadRemoteModule('mfe-claims', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full', // URL must be EMPTY
  },
  {
    path: 'mfe-reference-data',
    loadChildren: () =>
      loadRemoteModule('mfe-reference-data', './Routes').then(
        (m) => m.remoteRoutes
      ),
  },
];
