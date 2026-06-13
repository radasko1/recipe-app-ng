export type CreateDataCollectionPagePayload = {
  page_url: string;
  domainConfigurationId?: string;
  titleSelector?: string;
  imageSelector?: string;
  caloriesSelector?: string;
  cookingTimeSelector?: string;
  ingredientItemSelector?: string[];
};
