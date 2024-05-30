import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CreateProjectType,
  CustomTypedForm,
  ErrorResponse,
  ProjectIdType,
  ProjectType,
} from '@typeorm';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { updatedDiff } from 'deep-object-diff';

type ProjectForm = CustomTypedForm<CreateProjectType>;

const STATUSES = {
  TO_DO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  INCOMPLETE: 'Incomplete',
  ARCHIVED: 'Archived'
} as const;

@Component({
  selector: 'nestjs-api-angular-mono-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {

  projectForm = new FormGroup<ProjectForm>({
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    status: new FormControl(STATUSES.TO_DO, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    startDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dueDate: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });
  projectStatusList = Object.values(STATUSES);
  project: ProjectType;
  projectId: ProjectIdType;
  loading = false;

  constructor(private readonly projectsService: ProjectsService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loading = true;
      this.projectId = Number(projectId);
      this.projectForm.disable();
      this.projectsService.getProjectById(this.projectId)
        .subscribe({
          next: (project) => {
            this.project = project;
            this.projectForm.patchValue({
              ...this.project
            });
            this.projectForm.enable();
            console.log(this.projectForm.value.status)
          },
          error: (error: ErrorResponse) => {
            console.log('error', error);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  saveProject() {
    if (this.projectForm.invalid) {
      return;
    }

    const projectData = this.projectForm.value;
    this.loading = true;

    let res: Observable<Required<ProjectType>>;

    if (this.projectId) {
      const updatedProjectData = updatedDiff(this.project, projectData);
      res = this.projectsService.updateProjectById(this.projectId, updatedProjectData);
    } else {
      res = this.projectsService.createProject(<CreateProjectType>projectData);
    }

    res.subscribe({
      next: (project) => {
        if (!this.projectId) {
          // navigate to the project edit form
          this.router.navigate([`/projects/${project.id}`]).then();
        }
        this.projectForm.reset({ ...project });
      },
      error: (error: ErrorResponse) => {
        console.log('error', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  get isFormSubmitDisabled() {
    return this.projectForm.invalid || (this.projectId && this.projectForm.pristine) || this.loading;
  }

}
