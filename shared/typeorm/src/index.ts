import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';
import {
  EntityClassOrSchema
} from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export * from './lib/typeorm.module';

export * from './utils';

export * from './lib/dtos/User.dto';
export * from './lib/dtos/Project.dto';

export * from './lib/entities/User.entity';
export * from './lib/entities/Project.entity';

export * from './lib/enums/User.enum';
export * from './lib/enums/Project.enum';
export * from './lib/enums/Misc.enum';

export * from './lib/types/User.types';
export * from './lib/types/Project.types';
export * from './lib/types/API.types';

export const forFeature = (...entities: EntityClassOrSchema[]): DynamicModule =>
  TypeOrmModule.forFeature(entities);
