import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'nestjs-api-angular-mono-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  constructor(private readonly usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe((users) => {
        users.forEach((user) => {
          console.log('user', user.id, user.name, user.email)
        });
      });

    this.usersService.getUserById(1)
      .subscribe((user) => {
        console.log('user', user.id, user.name)
      })
  }

}
