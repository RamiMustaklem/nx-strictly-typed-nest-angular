import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserType } from '@typeorm';

@Component({
  selector: 'nestjs-api-angular-mono-users',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  users: UserType[] = [];

  constructor(private readonly usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers({
      page: 1,
      limit: 10,
      filter: {
        // name: 'Rami',
        position: 'Developer',
        // department: 'Engineering',
        dob: (new Date("1988-01-06")).toISOString().substring(0, 10),
      },
      orderBy: 'desc',
      sortBy: 'dob',
      // text: 'John'
    })
      .subscribe({
        next: (users) => {
          this.users = users.items;
          users.items.forEach((user) => {
            console.log('user', user.id, user.name, user.email)
          });
          console.log('users.meta', users.meta);
        }, error(error) {
          console.log('error', error);
        }
      });

    /*this.usersService.getUserById(1)
      .subscribe((user) => {
        console.log('user', user)
      })*/
  }

}
