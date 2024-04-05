import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidationEvent } from 'src/app/models';
import { UsersService } from '../../services/users.service';
import { UserModel } from 'src/app/models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Output() validationEvent = new EventEmitter<ValidationEvent>();

  @Input() usersNames: string[] | null | undefined = [];
  @Input() currentUser: UserModel | null = null;

  protected readonly userForm: FormGroup = this.formBuilder.nonNullable.group(
    {
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      user_type: ['', [Validators.required]],
    },
  );

  get isEditMode(): boolean {
    return !!this.currentUser;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.isEditMode) {
      this.userForm.patchValue({
        ...this.currentUser,
        confirmPassword: this.currentUser?.password,
      });
    }
  }

  closeUserForm(): void {
    this.close.emit();
  }

  createUser(): void {
    if (this.usersNames?.includes(this.userForm.value?.username)) {
      this.validationEvent.emit({
        type: 'Error',
        message: 'User name is already exist',
      });

      return;
    }

    if (this.userForm.value.password !== this.userForm.value.confirmPassword) {
      this.validationEvent.emit({
        type: 'Error',
        message: 'Repeate password field is not the same as password',
      });
      return;
    }

    if (!this.userForm.valid) {
      this.validationEvent.emit({
        type: 'Error',
        message: 'Not valid form',
      });

      return;
    }

    this.validationEvent.emit({
      type: 'Success',
      message: 'Successfuly created user',
    });

    this.usersService.createUser(this.userForm.value);
  }

  deleteUser(): void {
    this.validationEvent.emit({
      type: 'Success',
      message: 'Successfuly deleted user',
    });

    this.usersService.deleteUser(this.userForm.value);
  }

  updateUser(): void {
    this.validationEvent.emit({
      type: 'Success',
      message: 'Successfuly updated user',
    });

    this.usersService.updateUser(this.userForm.value, this.currentUser?.username ?? '');
  }
}
