import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsService } from './projects.service';


@NgModule({
  declarations: [
    ProjectsComponent
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
