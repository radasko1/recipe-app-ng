import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { LocalizationModule } from '../localization-module/localization.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    LoginRoutingModule,
    RouterLink,
    SharedModule,
    SharedMaterialModule,
    LocalizationModule,
  ],
  providers: [LoginService],
})
export class LoginModule {}
