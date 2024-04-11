import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SourceDetailComponent } from './components/source-detail/source-detail.component';
import { SourceListComponent } from "./components/source-list/source-list.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'page', component: RecipeListComponent },
  { path: 'page/:id', component: RecipeDetailComponent },
  { path: 'source', component: SourceListComponent },
  { path: 'source/:id', component: SourceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
