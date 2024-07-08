import { PROJECT_STATUS } from '../types';
import { User } from './User';

export type Project = {
  id: number;
  name: string;
  description: string;
  startDate?: string;
  dueDate?: string;
  status?: PROJECT_STATUS;
  createdAt: Date;
  updatedAt: Date;
  team: User[];
};
