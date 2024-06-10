import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard/auth.guard';

/**
 * Adjust page width is done in component's template.
 */

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/search-module/search.module').then((module) => module.SearchModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin-module/admin.module').then((module) => module.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./modules/not-found-page/not-found-page.component').then(
        (module) => module.NotFoundPageComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
