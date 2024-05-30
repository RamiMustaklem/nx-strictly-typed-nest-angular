import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectIdType,
  QueryDto,
  Project,
  ProjectType
} from '@typeorm';
import { QueryOptions } from '@utils';

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
  @HttpCode(HttpStatus.OK)
  async getProjectById(@Param('id', ParseIntPipe) id: ProjectIdType) {
    const project = await this.projectsService.findProjectById(id);

    if (!project) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }

    return project;
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
