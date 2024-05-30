import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import { User } from './User.entity';
import { PROJECT_STATUS, STATUSES } from '@utils';
import { IsUnique } from '../IsUniqueValidator';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsUnique({ tableName: 'projects', column: 'name' })
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  @IsDateString()
  startDate?: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  @IsDateString()
  dueDate?: string;

  @Column({
    type: 'varchar',
    default: STATUSES.TO_DO,
  })
  @IsNotEmpty()
  @IsIn(Object.values(STATUSES))
  status?: PROJECT_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  team: User[];
}
