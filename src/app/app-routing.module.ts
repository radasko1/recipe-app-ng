import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './shared/guards/admin-auth.guard';

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
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then((module) => module.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((module) => module.AdminModule),
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
