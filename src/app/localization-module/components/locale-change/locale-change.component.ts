import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { CZECH_LANG, ENGLISH_LANG, Language } from '../../models/language.type';
import { LocaleService } from '../../services/locale.service';
import locale from './locale-change.locale.json';

type LanguageButton = {
  code: Language;
  translation: string;
};

@Component({
  selector: 'app-locale-change',
  templateUrl: './locale-change.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleChangeComponent {
  protected readonly locale = locale;
  protected readonly languageConfig: LanguageButton[] = [
    { code: CZECH_LANG, translation: 'Czech' },
    { code: ENGLISH_LANG, translation: 'English' },
  ];

  constructor(
    protected readonly langService: LanguageService,
    protected readonly localeService: LocaleService
  ) {}

  protected handleClick(item: LanguageButton) {
    this.langService.change(item.code);
  }

  /** Get translated language label */
  protected get languageLabel() {
    switch (this.langService.language) {
      case CZECH_LANG:
        return this.locale[CZECH_LANG].Czech;
      case ENGLISH_LANG:
        return this.locale[ENGLISH_LANG].English;
    }
  }
}
