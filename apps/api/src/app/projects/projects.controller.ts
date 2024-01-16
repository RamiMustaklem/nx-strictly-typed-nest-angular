import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectIdType,
  QueryDto,
  Project,
  QueryOptions,
  ProjectType
} from '@typeorm';

type ProjectsListQueryOptions = QueryOptions<ProjectType, 'team'>;

@Controller('projects')
export class ProjectsController {

  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query() query: QueryDto<Project>,
  ) {
    const { orderBy, sortBy, text, filter } = <ProjectsListQueryOptions>query;
    return this.projectsService.paginate({ page, limit }, {
      text,
      sortBy,
      orderBy,
      filter
    });
  }

  @Get(':id')
  getProjectById(@Param('id', ParseIntPipe) id: ProjectIdType) {
    return this.projectsService.findProjectById(id);
  }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Put(':id')
  async updateProject(@Param('id', ParseIntPipe) id: ProjectIdType, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectsService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  async deleteProjectById(@Param('id', ParseIntPipe) id: ProjectIdType) {
    await this.projectsService.deleteProject(id);
  }

}
