import { ObjectValues } from '../../utils';

export const STATUSES = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  INCOMPLETE: 'Incomplete',
  ARCHIVED: 'Archived',
} as const;

export type PROJECT_STATUS = ObjectValues<typeof STATUSES>;
