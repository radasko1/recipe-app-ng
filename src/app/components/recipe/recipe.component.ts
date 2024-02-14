import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.interface';
import { LanguageService } from '../../services/language.service';
import locale from './recipe.locale.json';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
})
export class RecipeComponent {
  protected readonly locale = locale;

  /** List of recipes */
  @Input() list: Recipe[] = [];

  constructor(protected readonly lang: LanguageService) {}
}
