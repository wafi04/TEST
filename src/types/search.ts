// type option of fiilter of search
export interface QuerySearch {
  category?: string;
  gender?: string;
  limit?: number;
  sortBy?: string;
  offset?: number;
  search?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  color?: string;
  size?: string;
}
