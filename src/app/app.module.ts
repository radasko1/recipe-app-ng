import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LanguageService } from './services/app-language.service';
import { SearchBarModule } from './modules/search-bar/search-bar.module';
import { CookieService } from './services/cookie.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, SearchBarModule],
  providers: [LanguageService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
