import { Injectable } from '@angular/core';
import { Ingredient } from '../../search-module/models/ingredient.interface';
import { LanguageService } from '../../shared/services/language-service/language.service';
import { CheckboxListService } from '../models/checkbox-list-service.interface';

@Injectable()
export class RequiredIngredientCheckboxListService implements CheckboxListService {
  constructor(private readonly languageService: LanguageService) {}

  getLabel(value: Ingredient): string {
    return value.locale[this.languageService.language];
  }
}
