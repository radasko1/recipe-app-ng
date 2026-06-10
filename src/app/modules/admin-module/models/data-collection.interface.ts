import { DataCollectionPageData } from './data-collection-page-data.interface';

export interface DataCollection {
  id: string;
  page_data: DataCollectionPageData;
  page_url: string;
  checked: boolean;
  approved: boolean;
  recipe_id: number | null;
}
