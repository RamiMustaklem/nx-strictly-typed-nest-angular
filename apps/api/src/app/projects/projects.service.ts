import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  CreateProjectDto,
  Project,
  UpdateProjectDto,
  User,
  ProjectIdType,
  ProjectType
} from '@typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { QueryOptions } from '@utils';

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
    return this.projectRepository.find({ relations: ['team'] });
  }

  async findProjectById(id: ProjectIdType) {
    return await this.projectRepository.findOne({ where: { id }, relations: ['team'] });
  }

  createProject(project: CreateProjectDto) {
    const newProject = this.projectRepository.create({
      ...project,
      createdAt: new Date(),
    });
    return this.projectRepository.save(newProject);
  }

  async updateProject(id: ProjectIdType, project: UpdateProjectDto) {
    await this.projectRepository.update({ id }, { ...project });
    return await this.projectRepository.findOne({ where: { id } });
  }

  deleteProject(id: ProjectIdType) {
    return this.projectRepository.delete({ id });
  }

}
