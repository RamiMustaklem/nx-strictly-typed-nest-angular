import { Module } from '@nestjs/common';
import { forFeature, Project, User } from '@typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    forFeature(
      User,
      Project
    )
  ],
})
export class ProjectsModule {}
