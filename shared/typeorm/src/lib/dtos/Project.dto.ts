import { Project as ProjectEntity } from '../entities/Project.entity';

export type ProjectDto = InstanceType<typeof ProjectEntity>;

export type CreateProjectDto = Omit<
  ProjectDto,
  'id' | 'slug' | 'createdAt' | 'updatedAt' | 'user'
>;

export type UpdateProjectDto = Partial<CreateProjectDto>;

export type ProjectIdDto = ProjectDto['id'];
