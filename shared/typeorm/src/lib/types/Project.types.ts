import { ProjectDto } from '../dtos/Project.dto';
import { STATUSES } from '../enums/Project.enum';

type TO_DO = typeof STATUSES.TO_DO;
type ARCHIVED = typeof STATUSES.ARCHIVED;

type BaseProject = Omit<ProjectDto, 'status' | 'createdAt' | 'updatedAt'>;

export type ActiveProject = BaseProject & Required<{
  status: TO_DO
}>;

export type ArchivedProject = BaseProject & Required<{
  status: ARCHIVED
}>;
