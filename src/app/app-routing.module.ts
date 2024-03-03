import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './404-not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./homepage-module/homepage.module').then((module) => module.HomepageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search-module/search.module').then((module) => module.SearchModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-module/admin.module').then((module) => module.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
