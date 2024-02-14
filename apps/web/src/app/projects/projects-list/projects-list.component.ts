import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ProjectType } from '@typeorm';
import { statusColorMap } from '../../utils';

@Component({
  selector: 'nestjs-api-angular-mono-projects',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent implements OnInit {

  projects: ProjectType[] = [];
  projectStatusMap: typeof statusColorMap = statusColorMap

  constructor(private readonly projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects({
      page: 1,
      limit: 10,
      filter: {
        // status: 'To Do',
        // dueDate: (new Date("1988-01-06")).toISOString().substring(0, 10),
      },
      orderBy: 'desc',
      sortBy: 'dueDate',
    })
      .subscribe({
        next: (projects) => {
          this.projects = projects.items;
          projects.items.forEach((project) => {
            console.log('project', project.id, project.name, project.dueDate, project.status)
          });
          console.log('projects.meta', projects.meta);
        }, error(error) {
          console.log('error', error);
        }
      });

    /*this.projectsService.getProjectById(1)
      .subscribe({
        next(project) {
          console.log('project', project)
        },
        error(error: ErrorResponse) {
          console.log('error', error)
        }
      });*/
  }

}
