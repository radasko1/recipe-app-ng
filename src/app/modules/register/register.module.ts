import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { UserRegistrationService } from './user-registration.service';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [RegisterRoutingModule, ReactiveFormsModule],
  exports: [],
  providers: [UserRegistrationService],
})
// TODO rename to something which cover 'register' and 'login' together
export class RegisterModule {}
