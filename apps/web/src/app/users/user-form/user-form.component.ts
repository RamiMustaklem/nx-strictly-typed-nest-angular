import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomTypedForm, DEPARTMENTS, ErrorResponse, POSITIONS } from '@utils';
import { CreateUserType, UserIdType, UserType } from '@typeorm';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { updatedDiff } from 'deep-object-diff';

type UserForm = CustomTypedForm<CreateUserType>;

@Component({
  selector: 'nestjs-api-angular-mono-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  userForm = new FormGroup<UserForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dob: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('mail@example.com', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    department: new FormControl('Engineering', { nonNullable: true, validators: [Validators.required] }),
    position: new FormControl('Developer', { nonNullable: true, validators: [Validators.required] }),
  });
  departmentList = Object.values(DEPARTMENTS);
  positionList = Object.values(POSITIONS);
  user: UserType;
  userId: UserIdType;
  loading = false;

  constructor(private readonly usersService: UsersService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loading = true;
      this.userId = Number(userId);
      this.userForm.disable();
      this.usersService.getUserById(this.userId)
        .subscribe({
          next: (user) => {
            this.user = user;
            this.userForm.patchValue({
              ...this.user
            });
            this.userForm.enable();
          },
          error: (error: ErrorResponse) => {
            console.log('error', error);
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  saveUser() {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;
    this.loading = true;

    let res: Observable<Required<UserType>>;

    if (this.userId) {
      const updatedUserData = updatedDiff(this.user, userData);
      res = this.usersService.updateUserById(this.userId, updatedUserData);
    } else {
      res = this.usersService.createUser(<CreateUserType>userData);
    }

    res.subscribe({
      next: (user) => {
        if (!this.userId) {
          // navigate to the user edit form
          this.router.navigate([`/users/${user.id}`]).then();
        }
        this.userForm.reset({ ...user });
      },
      error: (error: ErrorResponse) => {
        console.log('error', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  get isFormSubmitDisabled() {
    return this.userForm.invalid || (this.userId && this.userForm.pristine) || this.loading;
  }

}
