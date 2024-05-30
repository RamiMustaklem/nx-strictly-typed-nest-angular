import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { ProjectType, QueryOptions } from '@typeorm';
import { statusColorMap } from '../../utils';

@Component({
  selector: 'nestjs-api-angular-mono-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent implements OnInit {

  projects: ProjectType[] = [];
  projectStatusMap: typeof statusColorMap = statusColorMap
  filter: QueryOptions<ProjectType>['filter'] = {
    // dueDate: (new Date("2025-01-01")).toISOString().substring(0, 10),
  };

  constructor(private readonly projectsService: ProjectsService,
              private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const status = params['status'];
      console.log(params);
      this.filter = { ...this.filter, status };
      // if all filter fields are undefined or null make the filters object undefined
      if (Object.values(this.filter).every((value) => !value)) {
        this.filter = undefined;
      }
      this.getProjects();
    });
  }

  private getProjects() {
    this.projectsService.getProjects({
      page: 1,
      limit: 10,
      orderBy: 'desc',
      sortBy: 'dueDate',
      ...(this.filter && { filter: this.filter }),
    })
      .subscribe({
        next: (projects) => {
          this.projects = projects.items;
          // console.log('projects.meta', projects.meta);
        }, error(error) {
          console.log('error', error);
        }
      });
  }

}
