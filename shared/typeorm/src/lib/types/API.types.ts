import { OrderBy, SortBy } from '../enums/Misc.enum';

export interface QueryOptions<
  DTO,
  Excluded extends keyof DTO = never,
  Fields extends keyof DTO = keyof DTO,
> {
  page?: number;
  limit?: number;
  // the sortBy field should be a key of the DTO interface
  sortBy?: `${SortBy}` | Exclude<keyof DTO, Excluded>;
  orderBy?: `${OrderBy}`;
  text?: string;
  // filter object should be a subset of the DTO interface, excluding the K field
  filter?: Partial<Pick<DTO, Exclude<Fields, Excluded>>>;
}

export interface ItemResponse<T, K = never> {
  item: T;
  related: K;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
