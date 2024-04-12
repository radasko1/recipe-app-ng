import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardPageComponent } from './components/admin-dashboard-page/admin-dashboard-page.component';
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { RecipeListPageComponent } from './components/recipe-list-page/recipe-list-page.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SourceDetailComponent } from './components/source-detail/source-detail.component';
import { SourceListPageComponent } from './components/source-list-page/source-list-page.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardPageComponent },
  { path: 'page', component: RecipeListPageComponent },
  { path: 'page/:id', component: RecipeDetailComponent },
  { path: 'source', component: SourceListPageComponent },
  { path: 'source/:id', component: SourceDetailComponent },
  { path: 'ingredient', component: CreateIngredientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
