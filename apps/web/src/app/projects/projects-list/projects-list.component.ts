import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { PROJECT_STATUS, ProjectType } from '@typeorm';
import { statusColorMap } from '../../utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nestjs-api-angular-mono-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent implements OnInit {

  projects: ProjectType[] = [];
  projectStatusMap: typeof statusColorMap = statusColorMap
  status: PROJECT_STATUS;

  constructor(private readonly projectsService: ProjectsService,
              private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.status = params['status'];
      console.log(params);
      this.getProjects();
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

  private getProjects() {
    this.projectsService.getProjects({
      page: 1,
      limit: 10,
      filter: {
        ...(this.status && { status: this.status }),
        // dueDate: (new Date("1988-01-06")).toISOString().substring(0, 10),
      },
      orderBy: 'desc',
      sortBy: 'dueDate',
    })
      .subscribe({
        next: (projects) => {
          this.projects = projects.items;
          projects.items.forEach((project) => {
            // console.log('project', project.id, project.name, project.dueDate, project.status)
          });
          // console.log('projects.meta', projects.meta);
        }, error(error) {
          console.log('error', error);
        }
      });
  }

}
