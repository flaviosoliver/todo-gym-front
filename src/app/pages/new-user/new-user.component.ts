import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { UsersService } from 'src/app/modules/users/users.service';
import { CreateUserDto } from 'src/app/modules/users/dto/create-user.dto';
import { ShapeHistoryDto } from 'src/app/modules/users/dto/shape-history.dto';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup;
  isLoading = false;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]],
      birthDate: [{ value: null }, [Validators.required]],
      active: true,
      shape: this.formBuilder.group({
        age: [{ value: null, readonly: true }],
        height: [null, [Validators.required]],
        weight: [null, [Validators.required]],
        bmi: [{ value: null, readonly: true }],
      }),
    });

    this.userForm.get('birthDate')?.valueChanges.subscribe((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      this.userForm.get('shape.age')?.setValue(age);
      this.userForm.get('shape.age')?.markAsDirty();
    });

    this.userForm
      .get('shape.weight')
      ?.valueChanges.subscribe(() => this.calculateBMI());
    this.userForm
      .get('shape.height')
      ?.valueChanges.subscribe(() => this.calculateBMI());
  }

  calculateBMI() {
    const weight = this.userForm.get('shape.weight')?.value;
    const height = this.userForm.get('shape.height')?.value / 100;
    if (weight && height) {
      const bmi = weight / (height * height);
      this.userForm.get('shape.bmi')?.setValue(bmi.toFixed(2));
      this.userForm.get('shape.bmi')?.markAsDirty();
    }
  }

  onWeightInputChange(event: any) {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue.replace(',', '.'));
    if (!isNaN(numericValue)) {
      this.userForm.get('weight')?.setValue(numericValue.toFixed(2));
    }
  }

  async saveUser() {
    this.isLoading = true;
    const newUser: CreateUserDto = {
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      birthDate: this.userForm.get('birthDate')?.value,
      active: true,
      shape: this.userForm.get('shape')?.value as ShapeHistoryDto[],
    };

    const user = await this.userService.createUser(newUser);

    if (user) {
      const login = await this.authService.login(
        newUser.email,
        newUser.password
      );
      if (login) {
        this.isLoading = false;
        window.location.reload();
      }
    }
  }
}
