import { Transform, Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderBy, SortBy } from '../enums/Misc.enum';
import { QueryOptions } from '../types/API.types';

export class QueryDto implements QueryOptions<unknown, never, never> {

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
  sortBy?: `${SortBy}`;

  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  @IsIn(Object.values(OrderBy))
  orderBy?: `${OrderBy}`;

  @Transform(({ value }: { value: string }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  text?: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsOptional()
  filter?: QueryOptions<unknown>;
}
