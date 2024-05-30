import { Transform, Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderBy, SortBy, ORDER_BY, QueryOptions } from '@utils';

export class QueryDto<T, K extends keyof T = never, U extends Exclude<keyof T, K> = Exclude<keyof T, K>>
  implements QueryOptions<T, K, U> {

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number = 10;

  @IsString()
  @IsOptional()
  sortBy?: `${SortBy}` | Exclude<keyof T, K>; // QueryOptions<T, K, U>['sortBy'];

  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  @IsIn(Object.values(ORDER_BY))
  orderBy?: `${OrderBy}`;

  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  text?: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  filter?: QueryOptions<T, K, U>['filter']; // Partial<Pick<T, U>>;
}
