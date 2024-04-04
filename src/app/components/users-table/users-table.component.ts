import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from 'src/app/models';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  @Input() usersList: UserModel[] | null = [];

  @Output() edit = new EventEmitter<UserModel>();

  openEditUserForm(user: UserModel): void {
    this.edit.emit(user);
  }
}
