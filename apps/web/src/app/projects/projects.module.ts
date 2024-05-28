import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsService } from './projects.service';


@NgModule({
  declarations: [
    ProjectsComponent,
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
