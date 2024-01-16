import { CreateProjectDto, ProjectType, UpdateProjectDto } from '../dtos/Project.dto';
import { STATUSES } from '../enums/Project.enum';

export type CreateProjectType = InstanceType<typeof CreateProjectDto>;

export type UpdateProjectType = InstanceType<typeof UpdateProjectDto>;

export type ProjectIdType = ProjectType['id'];

type TO_DO = typeof STATUSES.TO_DO;
type ARCHIVED = typeof STATUSES.ARCHIVED;

type BaseProject = Omit<ProjectType, 'status' | 'createdAt' | 'updatedAt'>;

export type ActiveProject = BaseProject & Required<{
  status: TO_DO
}>;

export type ArchivedProject = BaseProject & Required<{
  status: ARCHIVED
}>;
