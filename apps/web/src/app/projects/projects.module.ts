import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsService } from './projects.service';
import { ProjectFormComponent } from './project-form/project-form.component';


@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ],
  providers: [
    ProjectsService
  ],
})
export class ProjectsModule { }
