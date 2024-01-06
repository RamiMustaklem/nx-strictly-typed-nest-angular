import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProjectDto,
  Project,
  UpdateProjectDto,
  User,
  ProjectIdDto
} from '@typeorm';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  findProjects() {
    return this.projectRepository.find({ relations: ['projects'] });
  }

  findProjectById(id: ProjectIdDto) {
    return this.projectRepository.findOne({ where: { id }, relations: ['projects'] });
  }

  createProject(user: CreateProjectDto) {
    const newProject = this.projectRepository.create({
      ...user,
      createdAt: new Date(),
    });
    return this.projectRepository.save(newProject);
  }

  updateProject(id: ProjectIdDto, user: UpdateProjectDto) {
    return this.projectRepository.update({ id }, { ...user });
  }

  deleteProject(id: ProjectIdDto) {
    return this.projectRepository.delete({ id });
  }

}
