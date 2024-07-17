import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { UserType } from '@typeorm';
import { DEPARTMENTS, POSITIONS, QueryOptions } from '@utils';

@Component({
  selector: 'nestjs-api-angular-mono-users',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  users: UserType[] = [];
  departments = Object.values(DEPARTMENTS);
  positions = Object.values(POSITIONS);
  filter: QueryOptions<UserType>['filter'] = {
    // dob: (new Date("2025-01-01")).toISOString().substring(0, 10),
  };
  tableHeaders: { label: string, value: keyof UserType, filterOnClick?: boolean }[] = [
    { value: 'id', label: 'Id' },
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'email' },
    { value: 'position', label: 'Position', filterOnClick: true },
    { value: 'department', label: 'Department', filterOnClick: true },
    { value: 'dob', label: 'DOB' },
    { value: 'createdAt', label: 'Created At' },
  ];

  constructor(private readonly usersService: UsersService,
              private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const position = params['position'];
      const department = params['department'];
      this.filter = { ...this.filter, position, department };
      // if all filter fields are undefined or null make the filters object undefined
      if (Object.values(this.filter).every((value) => !value)) {
        this.filter = undefined;
      }
      this.getUsers();
    });
  }

  private getUsers() {
    const filter = this.filter;
    this.usersService.getUsers({
      page: 1,
      limit: 10,
      orderBy: 'desc',
      sortBy: 'dob',
      // text: 'John',
      ...(filter && { filter }),
    })
      .subscribe({
        next: (users) => {
          this.users = users.items;
        }, error(error) {
          console.log('error', error);
        }
      });
  }

}
