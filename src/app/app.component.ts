import { Component } from '@angular/core';
import locale from './app.locale.json';
import { APPLICATION_NAME } from './app.settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['.main-height { min-height: calc(100vh - 5rem - 2rem); }'],
})
export class AppComponent {
  protected readonly locale = locale;
  protected readonly APPLICATION_NAME = APPLICATION_NAME;
  protected readonly yearDate = new Date().getFullYear();
}
