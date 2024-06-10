import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { UserType } from '@typeorm';
import { QueryOptions } from '@utils';

@Component({
  selector: 'nestjs-api-angular-mono-users',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  users: UserType[] = [];
  filter: QueryOptions<UserType>['filter'] = {
    // dob: (new Date("2025-01-01")).toISOString().substring(0, 10),
  };

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
    this.usersService.getUsers({
      page: 1,
      limit: 10,
      orderBy: 'desc',
      sortBy: 'dob',
      // text: 'John',
      ...(this.filter && { filter: this.filter }),
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
