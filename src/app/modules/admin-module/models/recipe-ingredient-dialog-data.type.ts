import { CheckboxListService } from './checkbox-list-service.interface';

export type RecipeIngredientDialogData = {
  dialogTitle: string;
  list: number[]; // list of IDs
  serviceInstance: CheckboxListService;
  onSave: (value: string) => void;
};
