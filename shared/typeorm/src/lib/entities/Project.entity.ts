import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';
import { PROJECT_STATUS, STATUSES } from '../enums/Project.enum';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'timestamp'
  })
  startDate?: Date;

  @Column({
    type: 'timestamp'
  })
  dueDate?: Date;

  @Column({
    type: 'varchar',
    default: STATUSES.TO_DO,
  })
  status?: PROJECT_STATUS = STATUSES.TO_DO;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  team: User[];
}
