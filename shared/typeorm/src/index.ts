import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';
import {
  EntityClassOrSchema
} from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export * from './lib/typeorm.module';

export * from './lib/dtos/User.dto';
export * from './lib/dtos/Project.dto';

export * from './lib/entities/User.entity';
export * from './lib/entities/Project.entity';

export const forFeature = (...entities: EntityClassOrSchema[]): DynamicModule =>
  TypeOrmModule.forFeature(entities);
