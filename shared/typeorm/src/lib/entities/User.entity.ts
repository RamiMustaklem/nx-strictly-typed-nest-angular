import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Project } from './Project.entity';
import { DEPARTMENT, POSITION } from '../enums/User.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'timestamp'
  })
  dob: Date;

  @Column({
    type: 'varchar',
  })
  position: POSITION;

  @Column({
    type: 'varchar',
  })
  department: DEPARTMENT;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => Project,
    (project) => project.team
  )
  projects: Project[];
}
