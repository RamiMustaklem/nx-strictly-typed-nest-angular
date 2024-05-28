import { STATUSES } from '../enums/Project.enum';
import { Project } from '../entities/Project.entity';

export type ProjectType = Required<InstanceType<typeof Project>>;
export type CreateProjectType = Pick<
  ProjectType,
  'name' | 'description' | 'startDate' | 'dueDate' | 'status'
>;
export type UpdateProjectType = Partial<CreateProjectType>;
/*export type UpdateProjectType = Partial<
  Omit<ProjectType, 'id' | 'createdAt' | 'updatedAt'>
>;*/

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
