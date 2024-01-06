import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDto, UpdateUserDto, UserDto, UserIdDto } from '@typeorm';

@Injectable()
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>('/api/users');
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
