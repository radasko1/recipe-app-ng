import { DataCollectionPageData } from './data-collection-page-data.interface';

export interface DataCollection {
  id: number;
  page_data: DataCollectionPageData;
  page_url: string;
  checked: boolean;
  approved: boolean;
  recipe_id: number | null;
}
