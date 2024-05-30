import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UserType,
  UserIdType,
  CreateUserType,
  UpdateUserType,
} from '@typeorm';
import { PaginatedResponse, QueryOptions } from '@utils';
import { BaseService } from '../base.service';

type UsersListQueryOptions = QueryOptions<UserType, 'password' | 'projects', 'dob' | 'position'>;

@Injectable()
export class UsersService extends BaseService {

  getUsers(queryOptions?: UsersListQueryOptions): Observable<PaginatedResponse<UserType>> {

    const params = queryOptions
      ? this.buildQueryOptions<UsersListQueryOptions>(queryOptions)
      : undefined;

    return this.http.get<PaginatedResponse<UserType>>('/api/users', {
      params,
    });
  }

  getUserById(id: UserIdType): Observable<UserType> {
    return this.http.get<UserType>(`/api/users/${id}`);
  }

  createUser(user: CreateUserType): Observable<UserType> {
    return this.http.post<UserType>('/api/users', { ...user });
  }

  updateUserById(id: UserIdType, user: UpdateUserType): Observable<UserType> {
    return this.http.put<UserType>(`/api/users/${id}`, { ...user });
  }

  deleteUserById(id: UserIdType): Observable<boolean> {
    return this.http.delete<boolean>(`/api/users/${id}`);
  }

}
