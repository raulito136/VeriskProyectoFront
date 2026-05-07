import { Route } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RemoteEntryComponent } from './entry.component';
import { routes } from '../app.routes';
import { ClaimService } from '../services/claim.service';
import { ClaimCommentService } from '../services/claim-comment.service';

export const remoteRoutes: Route[] = [
  { 
    path: '', 
    component: RemoteEntryComponent,
    providers: [
      provideHttpClient(),
      ClaimService,
      ClaimCommentService
    ],
    children: routes
  },
];
