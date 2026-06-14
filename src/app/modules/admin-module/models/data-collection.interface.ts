import { DataCollectionPageData } from './data-collection-page-data.interface';
import { DataCollectionStatus } from './data-collection-status.type';

export interface DataCollection {
  id: string;
  page_data: DataCollectionPageData | null;
  page_url: string;
  checked: boolean;
  approved: boolean;
  recipe_id: number | null;
  status: DataCollectionStatus;
}
