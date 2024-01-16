import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  CreateProjectDto,
  Project,
  UpdateProjectDto,
  User,
  ProjectIdType,
  QueryOptions,
  ProjectType
} from '@typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

type ProjectsListQueryOptions = QueryOptions<ProjectType, 'team'>;

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    filterOptions: Omit<ProjectsListQueryOptions, 'page' | 'limit'>
  ): Promise<Pagination<Project>> {
    const { text, filter, sortBy, orderBy } = filterOptions;
    return paginate<Project>(this.projectRepository, options, {
      ...(sortBy && orderBy && { order: { [sortBy]: orderBy } }),
      ...(text && { where: { name: Like(`%${text}%`) } }),
      ...(filter && { where: { ...filter } })
    });
  }

  findProjects() {
    return this.projectRepository.find({ relations: ['projects'] });
  }

  findProjectById(id: ProjectIdType) {
    return this.projectRepository.findOne({ where: { id }, relations: ['projects'] });
  }

  createProject(user: CreateProjectDto) {
    const newProject = this.projectRepository.create({
      ...user,
      createdAt: new Date(),
    });
    return this.projectRepository.save(newProject);
  }

  updateProject(id: ProjectIdType, user: UpdateProjectDto) {
    return this.projectRepository.update({ id }, { ...user });
  }

  deleteProject(id: ProjectIdType) {
    return this.projectRepository.delete({ id });
  }

}
