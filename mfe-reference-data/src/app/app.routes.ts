import { Route } from '@angular/router';
import { ClaimStatusListComponent } from './features/claim-statuses/claim-status-list/claim-status-list.component';
import { ClaimStatusFormComponent } from './features/claim-statuses/claim-status-form/claim-status-form.component';
import { PolicyTypeListComponent } from './features/policy-types/policy-type-list/policy-type-list.component';
import { CoverageTypeListComponent } from './features/coverage-types/coverage-type-list/coverage-type-list.component';
import { PolicyTypeFormComponent } from './features/policy-types/policy-type-form/policy-type-form.component';
import { CoverageTypeFormComponent } from './features/coverage-types/coverage-type-form/coverage-type-form.component';
import { RegionListComponent } from './features/regions/region-list/region-list.component';
import { RegionFormComponent } from './features/regions/region-form/region-form.component';

export const appRoutes: Route[] = [
  {
    path: 'reference-data/claim-statuses',
    component: ClaimStatusListComponent
  },
  {
    path: 'reference-data/claim-statuses/new',
    component: ClaimStatusFormComponent
  },
  {
    path: 'reference-data/claim-statuses/:id/edit',
    component: ClaimStatusFormComponent
  },
  {
    path:'reference-data/policy-types', component: PolicyTypeListComponent
  },
  {
    path:'reference-data/policy-types/new', component: PolicyTypeFormComponent
  },
  {
    path:'reference-data/policy-types/:id/edit', component: PolicyTypeFormComponent
  },
  {
    path:'reference-data/coverage-types', component: CoverageTypeListComponent
  },
  {
    path:'reference-data/coverage-types/new', component: CoverageTypeFormComponent
  },
  {
    path:'reference-data/coverage-types/:id/edit', component: CoverageTypeFormComponent
  },
  {
    path:'reference-data/regions', component: RegionListComponent
  },
  {
    path:'reference-data/regions/new', component: RegionFormComponent
  },
  {
    path:'reference-data/regions/:id/edit', component: RegionFormComponent
  },
  {path: 'reference-data', redirectTo: 'reference-data/claim-statuses', pathMatch: 'full' }
];
