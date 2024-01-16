import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { ErrorResponse } from '@typeorm';

@Component({
  selector: 'nestjs-api-angular-mono-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  constructor(private readonly projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getProjects({
      page: 1,
      limit: 10,
      filter: {
        status: 'In Progress',
        dueDate: (new Date("1988-01-06")).toISOString().substring(0, 10),
      },
      orderBy: 'desc',
      sortBy: 'dueDate',
    })
      .subscribe({
        next(projects) {
          projects.items.forEach((project) => {
            console.log('project', project.id, project.name, project.dueDate, project.status)
          });
          console.log('projects.meta', projects.meta);
        }, error(error) {
          console.log('error', error);
        }
      });

    this.projectsService.getProjectById(1)
      .subscribe({
        next(project) {
          console.log('project', project)
        },
        error(error: ErrorResponse) {
          console.log('error', error)
        }
      });
  }

}
