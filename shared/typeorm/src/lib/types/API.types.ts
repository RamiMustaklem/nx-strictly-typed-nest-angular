import { OrderBy, SortBy } from '../enums/Misc.enum';

export interface QueryOptions<
  DTO,
  Excluded extends keyof DTO = never,
  Fields extends Exclude<keyof DTO, Excluded> = Exclude<keyof DTO, Excluded>,
> {
  page?: number;
  limit?: number;
  // the sortBy field should be a key of the DTO interface
  sortBy?: `${SortBy}` | Exclude<keyof DTO, Excluded>;
  orderBy?: `${OrderBy}`;
  text?: string;
  // filter object should be a subset of the DTO interface, excluding the Excluded fields
  filter?: Partial<Pick<DTO, Fields>>;
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

export interface ErrorResponse {
  statusCode: number;
  message: string;
}
