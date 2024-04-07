import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../../language-switch-module/models/language.type';
import { Recipe } from '../models/recipe.interface';

@Pipe({
  name: 'recipeTitle',
  pure: true,
})
export class RecipeTitlePipe implements PipeTransform {
  transform(value: Recipe, language: Language): string {
    // if there's any value in locale
    if (value.locale && value.locale[language].trim().length) {
      return value.locale[language].trim();
    }
    return value.name;
  }
}
