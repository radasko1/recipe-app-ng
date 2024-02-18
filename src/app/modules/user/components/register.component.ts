import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { UserRegistrationService } from '../services/user-registration.service';
import locale from '../locale.json';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-register',
  template: `
    <div>
      <h2 class="text-lg font-medium">{{ locale[langService.language].RegistrationHeader }}</h2>
      <form [formGroup]="form" class="space-y-6 mb-3">
        <!--email-->
        <div>
          <label for="_email" class="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div class="mt-2">
            <input
              id="_email"
              name="email"
              type="text"
              formControlName="email"
              autocomplete="off"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <!--password-->
        <div>
          <label for="_password" class="block text-sm font-medium leading-6 text-gray-900">
            {{ locale[langService.language].Password }}
          </label>
          <div class="mt-2">
            <input
              id="_password"
              type="password"
              formControlName="password"
              autocomplete="off"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </form>
      <!--button-->
      <div>
        <button
          type="button"
          (click)="register()"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Register
        </button>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  protected readonly locale = locale;
  protected form = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control('', {
      // Matches any string between 8 and 40 characters in length.
      validators: [Validators.required, Validators.pattern('^.{8,40}$')],
    }),
  });

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly signupService: UserRegistrationService,
    protected readonly langService: LanguageService
  ) {}

  // TODO improve security; with SSL the posted data will be encoded
  // TODO loading indicator during process of account creation
  // TODO use Captcha
  // TODO add info about password characters (symbols)
  protected register() {
    if (this.form.status === 'INVALID') {
      return;
    }

    const formControls = this.form.controls;
    this.signupService
      .registerUser({ email: formControls.email.value, password: formControls.password.value })
      .pipe(
        finalize(() => {
          this.form.reset();
        })
      )
      .subscribe();
  }
}
