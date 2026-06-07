import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { APP_PAGE_TITLE } from '../../../../app.settings';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { SnackBarService } from '../../../../shared/services/snackbar/snackbar.service';
import { LoginService } from '../../services/login.service';
import locale from './login-page.locale.json';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  protected readonly locale = locale;
  protected readonly lang = inject(LanguageService);
  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  private readonly snackbar = inject(SnackBarService);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected isSubmitting = false;

  constructor(readonly title: Title) {
    title.setTitle(APP_PAGE_TITLE.LOGIN[this.lang.language]);
  }

  protected submit() {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.loginService
      .login(this.form.getRawValue())
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.snackbar.showSimpleMessage(this.locale[this.lang.language].SuccessMessage);
          // Redirect to root page
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.snackbar.showSimpleMessage(this.locale[this.lang.language].FailedMessage);
        },
      });
  }
}
