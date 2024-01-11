import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { OrderBy } from '@typeorm';

@Component({
  selector: 'nestjs-api-angular-mono-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  constructor(private readonly usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers(/*{
      filter: {
        name: 'Rami',
        position: 'Developer',
        department: 'Engineering',
        dob: new Date(),
      },
      orderBy: OrderBy.Asc,
      sortBy: 'department'
    }*/)
      .subscribe({
        next(users) {
          /*users.items.forEach((user) => {
            console.log('user', user.id, user.name, user.email)
          });*/
          console.log('users', users);
        }, error(error) {
          console.log('error', error);
        }
      });

    this.usersService.getUserById(1)
      .subscribe((user) => {
        console.log('user', user)
      })
  }

}
