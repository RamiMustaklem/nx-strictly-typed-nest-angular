import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsService } from './projects.service';
import { DataTableComponent } from '../data-table/data-table.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    DataTableComponent,
  ],
  providers: [
    ProjectsService
  ],
})
export class ProjectsModule { }
