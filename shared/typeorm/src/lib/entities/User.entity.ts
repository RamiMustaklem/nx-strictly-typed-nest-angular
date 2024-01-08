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

  @Column()
  dob: Date;

  @Column({
    type: 'enum',
    enum: POSITION,
  })
  position: POSITION;

  @Column({
    type: 'enum',
    enum: DEPARTMENT,
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
