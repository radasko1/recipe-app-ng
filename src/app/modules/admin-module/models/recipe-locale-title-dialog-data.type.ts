import { Locale } from '../../search-module/models/locale.interface';

export type RecipeLocaleTitleDialogData = {
  title: string;
  localization: Locale;
  onSave: (value: Locale) => void;
};
