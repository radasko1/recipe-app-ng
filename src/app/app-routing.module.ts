import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/homepage/homepage.module').then((module) => module.HomepageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./modules/search/search.module').then((module) => module.SearchModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((module) => module.AdminModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
