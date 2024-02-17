import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { UserRegistrationService } from './user-registration.service';

@Component({
  selector: 'app-register',
  template: `
    <div>
      <h2>User registration</h2>
      <form [formGroup]="form">
        <label for="_email">Email</label>
        <input
          id="_email"
          type="text"
          formControlName="email"
          placeholder="Email"
          tabindex="-1"
          autocomplete="off"
        />
        <label for="_password">Heslo</label>
        <input
          id="_password"
          type="password"
          formControlName="password"
          placeholder="Password"
          tabindex="-1"
          autocomplete="off"
        />
      </form>
    </div>
    <button type="button" (click)="register()">Register</button>
  `,
})
export class RegisterComponent {
  // TODO page does not have styles
  protected form = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control('', { validators: Validators.required }),
  });

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly signupService: UserRegistrationService
  ) {}

  // TODO improve security; with SSL the posted data will be encoded
  // TODO loading indicator during process of account creation
  // TODO use Captcha
  // TODO password validator (regex)
  protected register() {
    if (this.form.status === 'INVALID') {
      return;
    }

    const body = this.form.value;
    this.signupService
      .registerUser(body)
      .pipe(
        finalize(() => {
          this.form.reset();
        })
      )
      .subscribe();
  }
}
