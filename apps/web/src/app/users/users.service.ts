import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  UserIdDto,
  PaginatedResponse,
  QueryOptions
} from '@typeorm';

type UsersListQueryOptions = QueryOptions<UserDto, 'password' | 'projects', 'projects'>;

@Injectable()
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  private buildQueryOptions(queryOptions: UsersListQueryOptions): HttpParams {
    const params = new HttpParams({
      // fromObject: queryOptions
    });
    params.set('foo', 'bar');

    Object.entries(queryOptions).forEach((q) => {
      console.log('q', q)
      // console.log('queryOptions["q"]', queryOptions[q])
      // params.set(q);
    });

    return params;
  }

  getUsers(queryOptions?: UsersListQueryOptions): Observable<PaginatedResponse<UserDto>> {

    // const params = queryOptions ? this.buildQueryOptions(queryOptions) : undefined;

    // const filteredParams = Object.entries(params || {})
    //   .filter(([, value]) => value !== undefined)
    //   .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return this.http.get<PaginatedResponse<UserDto>>('/api/users', {
      // ...(filteredParams && { filteredParams }),
      // params
    });
  }

  getUserById(id: UserIdDto): Observable<UserDto> {
    return this.http.get<UserDto>(`/api/users/${id}`);
  }

  createUser(user: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>('/api/users', { ...user });
  }

  updateUserById(id: UserIdDto, user: UpdateUserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`/api/users/${id}`, { ...user });
  }

  deleteUserById(id: UserIdDto): Observable<boolean> {
    return this.http.delete<boolean>(`/api/users/${id}`);
  }

}
