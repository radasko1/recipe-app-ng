import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './components/register.component';
import { UserRegistrationService } from './services/user-registration.service';
import { LoginComponent } from './components/login.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [UserRoutingModule, ReactiveFormsModule],
  exports: [],
  providers: [UserRegistrationService],
})
export class UserModule {}
