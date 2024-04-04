import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ValidationEvent, UserModel } from 'src/app/models';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPageComponent {
  usersList$: Observable<UserModel[] | null> = this.usersService.currentUsers$;
  usersNamesList$: Observable<string[] | undefined> = this.usersList$.pipe(map((users) => users?.map((user) => user.username)));

  userFormShowed = false;
  currentUser: UserModel | null = null;

  errorInfoPanel: boolean = false;
  successInfoPanel: boolean = false;
  errorInfoPanelMessage: string = '';
  successInfoPanelMessage: string = '';

  constructor(private readonly usersService: UsersService, private readonly cdr: ChangeDetectorRef) {}

  openEditUserForm(user: UserModel): void {
    this.currentUser = user;
    this.userFormShowed = true;
  }

  showInfoPanelMessage(event: ValidationEvent): void {
    if (event.type === 'Success') {
      this.errorInfoPanel = false;
      this.successInfoPanel = true;
      this.userFormShowed = false;
      this.successInfoPanelMessage = event.message;
      this.currentUser = null;

      setTimeout(() => {
        this.closeInfoPanels();
        this.cdr.detectChanges();
      }, 2000);

      return
    }

    this.errorInfoPanel = true;
    this.successInfoPanel = false;
    this.errorInfoPanelMessage = event.message;
  }

  closeUserForm(): void {
    this.userFormShowed = false;
    this.currentUser = null;

    this.closeInfoPanels();
    this.cdr.detectChanges();
  }

  closeInfoPanels(): void {
    this.errorInfoPanel = false;
    this.successInfoPanel = false;
  }
}
