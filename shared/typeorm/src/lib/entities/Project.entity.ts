import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany
} from 'typeorm';
import { User } from './User.entity';
import { PROJECT_STATUS } from '../enums/Project.enum';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  startDate?: Date;

  @Column()
  dueDate?: Date;

  @Column({
    type: 'enum',
    enum: PROJECT_STATUS,
    default: PROJECT_STATUS.TO_DO,
  })
  status: PROJECT_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.projects)
  team: User[];
}
