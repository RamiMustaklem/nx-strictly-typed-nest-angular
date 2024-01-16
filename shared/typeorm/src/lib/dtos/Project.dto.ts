import { Project } from '../entities/Project.entity';
import { PartialType, PickType } from '@nestjs/mapped-types';

export type ProjectType = InstanceType<typeof Project>;

/*export type CreateProjectDto = Pick<
  ProjectType,
  'name' | 'description' | 'startDate' | 'dueDate' | 'status'
>;*/

// const projectOmittedFields: Readonly<Array<keyof ProjectType>> = ['id', 'createdAt', 'updatedAt'] as const;
// export class ProjectDto extends OmitType(ProjectEntity, createProjectOmittedFields) {}

const createProjectFields: Readonly<Array<keyof ProjectType>> = [
  'name',
  'description',
  'startDate',
  'dueDate',
  'status',
] as const;
export class CreateProjectDto extends PickType(Project, createProjectFields) {}

/*export type UpdateProjectDto = Partial<
  Omit<ProjectType, 'id' | 'createdAt' | 'updatedAt'>
>;*/

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
