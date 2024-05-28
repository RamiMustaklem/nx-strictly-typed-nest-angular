import { Project } from '../entities/Project.entity';
import { PartialType, PickType } from '@nestjs/mapped-types';

const createProjectFields: Readonly<Array<keyof Project>> = [
  'name',
  'description',
  'startDate',
  'dueDate',
  'status',
] as const;
export class CreateProjectDto extends PickType(Project, createProjectFields) {}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
