import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register.component';
import { LoginComponent } from './components/login.component';

const routes: Routes = [
  { path: 'signup', component: RegisterComponent },
  { path: 'signin', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
