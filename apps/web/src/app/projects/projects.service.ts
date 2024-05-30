import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import {
  ProjectType,
  ProjectIdType,
  CreateProjectType,
  UpdateProjectType,
} from '@typeorm';
import { PaginatedResponse, QueryOptions } from '@utils';
import { BaseService } from '../base.service';

type ProjectsListQueryOptions = QueryOptions<ProjectType, 'team'>;

@Injectable()
export class ProjectsService extends BaseService {

  getProjects(queryOptions?: ProjectsListQueryOptions): Observable<PaginatedResponse<ProjectType>> {

    const params = queryOptions
      ? this.buildQueryOptions<ProjectsListQueryOptions>(queryOptions)
      : undefined;

    return this.http.get<PaginatedResponse<ProjectType>>('/api/projects', { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectById(id: ProjectIdType): Observable<ProjectType> {
    return this.http.get<ProjectType>(`/api/projects/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createProject(project: CreateProjectType): Observable<ProjectType> {
    return this.http.post<ProjectType>('/api/projects', { ...project })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProjectById(id: ProjectIdType, project: UpdateProjectType): Observable<ProjectType> {
    return this.http.put<ProjectType>(`/api/projects/${id}`, { ...project })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProjectById(id: ProjectIdType): Observable<boolean> {
    return this.http.delete<boolean>(`/api/projects/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

}
