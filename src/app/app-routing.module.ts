import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    loadChildren: () =>
      import('./modules/register/register.module').then((module) => module.RegisterModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
