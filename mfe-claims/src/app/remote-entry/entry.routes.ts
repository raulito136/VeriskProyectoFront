import { Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RemoteEntryComponent } from './entry.component';
import { routes } from '../app.routes';

export const remoteRoutes: Route[] = [
  { 
    path: '', 
    component: RemoteEntryComponent,
    providers: [
      provideHttpClient()
    ],
    children: routes
  },
];
