import { CSP_NONCE, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      {
        provide: CSP_NONCE,
        useValue: environment.CSP_NONCE,
      },
    ],
  })
  .catch((err) => console.error(err));
