import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UpdateUserDto } from 'src/app/modules/users/dto/update-user.dto';
import { User } from 'src/app/modules/users/interface/user.interface';
import { UsersService } from 'src/app/modules/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLoading = false;
  hide: boolean = true;
  userId: string = '';
  user!: User;
  selectedAvatar: string = '';
  userForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ],
    ],
    alterPassword: [false],
    password: [{ value: null, readonly: true }],
    birthDate: [{ value: null }, [Validators.required]],
    active: true,
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private route: ActivatedRoute,
    private readonly usersService: UsersService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['userId'];
    });
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.getUser(this.userId);
  }

  async getUser(id: string) {
    const user = await this.usersService.getUser(id);

    if (user) {
      this.user = user;
      this.loadForm(user);
      this.isLoading = false;
    }
    this.isLoading = false;
  }

  loadForm(user: User) {
    if (user) {
      this.userForm
        .get('firstName')
        ?.setValue(user.firstName, { onlySelf: true });
      this.userForm
        .get('lastName')
        ?.setValue(user.lastName, { onlySelf: true });
      this.userForm.get('email')?.setValue(user.email, { onlySelf: true });
      this.userForm.get('password')?.setValue('', { onlySelf: true });
      this.userForm
        .get('birthDate')
        ?.setValue(user.birthDate, { onlySelf: true });
      this.userForm.get('active')?.setValue(user.active, { onlySelf: true });
    }
  }

  handleActivePasswordInput() {
    if (this.userForm.controls['alterPassword'].value === true) {
      this.userForm.get('password')?.enable();
    } else {
      this.userForm
        .get('password')
        ?.disable({ onlySelf: true, emitEvent: false });
    }
  }

  onAvatarSelected(avatar: string) {
    this.selectedAvatar = avatar;
  }

  togglePasswordValidation(): void {
    const passwordControl = this.userForm.get('password');

    if (this.userForm.get('alterPassword')?.value) {
      passwordControl?.setValidators([
        Validators.required,
        Validators.pattern(/^.{6,}$/),
      ]);
    } else {
      passwordControl?.clearValidators();
    }

    passwordControl?.updateValueAndValidity();
  }

  async saveEdit() {
    if (event) {
      event?.preventDefault();
    }

    this.isLoading = true;
    const userEdit: UpdateUserDto = {
      id: this.userId,
      email: this.userForm.get('email')?.value,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      birthDate: this.userForm.get('birthDate')?.value,
      active: this.userForm.get('active')?.value,
      password:
        this.userForm.get('password')?.value === ''
          ? this.user.password
          : this.userForm.get('password')?.value,
      avatar: this.selectedAvatar ? this.selectedAvatar : this.user.avatar,
    };

    await this.usersService.updateUser(this.userId, userEdit);

    this.router.navigate(['']);
    this.isLoading = false;
  }
}
