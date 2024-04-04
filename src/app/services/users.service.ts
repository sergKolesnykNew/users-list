import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUsers = new BehaviorSubject<UserModel[]>([
    {
      username: 'TestUser',
      first_name: 'Test first name',
      last_name: 'Test last name',
      email: '123@gmail.com',
      password: '1q2w3e4r',
      user_type: 'Admin',
    },
    {
        username: 'TestUser2',
        first_name: 'Test first name',
        last_name: 'Test last name',
        email: '123@gmail.com',
        password: '1q2w3e4r',
        user_type: 'Admin',
      },
  ]);

  currentUsers$: Observable<UserModel[] | null> = this.currentUsers.asObservable();

  createUser(newUser: UserModel): void {
    this.currentUsers.next([...this.currentUsers.getValue(), newUser]);
  }

  deleteUser(deletedUser: UserModel): void {
    this.currentUsers.next([...this.currentUsers.getValue().filter((user) => user.username !== deletedUser.username)]);
  }
}
