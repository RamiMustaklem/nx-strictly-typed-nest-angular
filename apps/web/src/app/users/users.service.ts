import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto, UserIdDto } from '@typeorm';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>('/api/users');
  }

  getUserById(id: UserIdDto): Observable<UserDto> {
    return this.http.get<UserDto>(`/api/users/${id}`);
  }
}
