import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <h2>Login</h2>
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
    <button type="button" (click)="login()">Login</button>
  `,
})
export class LoginComponent {
  protected form = this.fb.group({
    email: this.fb.control<string>('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control<string>('', { validators: Validators.required }),
  });

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly authService: AuthService
  ) {}

  // TODO improve security; with SSL the posted data will be encoded
  // TODO loading indicator during process of account creation
  // TODO show error message when some field is not validate
  protected login() {
    if (this.form.status === 'INVALID') {
      return;
    }

    const { email, password } = this.form.controls;
    this.authService
      .loginUser({ email: email.value, password: password.value })
      .pipe(
        finalize(() => {
          this.form.reset();
        })
      )
      .subscribe({
        error: (err) => {
          console.log('Login failed');
        },
      });
  }
}
