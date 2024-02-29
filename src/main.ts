import { CSP_NONCE, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { CONTENT_SECURITY_POLICY_TOKEN } from './app/app.settings';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      {
        provide: CSP_NONCE,
        useValue: CONTENT_SECURITY_POLICY_TOKEN,
      },
    ],
  })
  .catch((err) => console.error(err));
