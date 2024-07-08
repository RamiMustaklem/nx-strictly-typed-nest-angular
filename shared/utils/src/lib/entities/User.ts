import { DEPARTMENT, POSITION } from '../types';
import { Project } from './Project';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  dob: Date;
  position: POSITION;
  department: DEPARTMENT;
  createdAt: Date;
  updatedAt: Date;
  projects: Project[];
};
