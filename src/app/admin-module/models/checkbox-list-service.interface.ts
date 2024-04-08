export interface CheckboxListService {
  /**
   * Function to return label for checkbox
   * @param listItem List item
   */
  getLabel(listItem: unknown): string;
}
