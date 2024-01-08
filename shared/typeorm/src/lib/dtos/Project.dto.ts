import { Project as ProjectEntity } from '../entities/Project.entity';

export type ProjectDto = InstanceType<typeof ProjectEntity>;

export type CreateProjectDto = Pick<
  ProjectDto,
  'name' | 'description' | 'startDate' | 'dueDate' | 'status'
>;

export type UpdateProjectDto = Partial<
  Omit<ProjectDto, 'id' | 'createdAt' | 'updatedAt'>
>;

export type ProjectIdDto = ProjectDto['id'];
