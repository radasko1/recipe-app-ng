import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./homepage/homepage.component').then((module) => module.HomepageComponent),
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
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then(
        (module) => module.NotFoundPageComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
