import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, ProjectIdDto } from '@typeorm';

@Controller('projects')
export class ProjectsController {

  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.findProjects();
  }

  @Get(':id')
  getProjectById(@Param('id', ParseIntPipe) id: ProjectIdDto) {
    return this.projectsService.findProjectById(id);
  }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Put(':id')
  async updateProject(@Param('id', ParseIntPipe) id: ProjectIdDto, @Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectsService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  async deleteProjectById(@Param('id', ParseIntPipe) id: ProjectIdDto) {
    await this.projectsService.deleteProject(id);
  }

}
