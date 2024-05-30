import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsDateString, IsEmail, IsIn, IsNotEmpty } from 'class-validator';
import { Project } from './Project.entity';
import { DEPARTMENT, DEPARTMENTS, Email, POSITION, POSITIONS } from '@utils';
import { IsUnique } from '../IsUniqueValidator';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true, type: 'varchar' })
  @IsEmail()
  @IsUnique({ tableName: 'users', column: 'email' })
  email: Email;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  @IsDateString()
  dob: string;

  @Column({
    type: 'varchar',
  })
  @IsNotEmpty()
  @IsIn(Object.values(POSITIONS))
  position: POSITION;

  @Column({
    type: 'varchar',
  })
  @IsNotEmpty()
  @IsIn(Object.values(DEPARTMENTS))
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
