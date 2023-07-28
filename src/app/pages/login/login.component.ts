import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  hide: boolean = true;
  loginFail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern(/^.{6,}$/)]],
    });
  }

  async onLogin() {
    this.isLoading = true;
    const result = await this.authService.login(
      this.loginForm?.controls['email'].value,
      this.loginForm?.controls['password'].value
    );
    if (result) {
      this.router.navigate(['']);
      this.isLoading = false;
    } else {
      this.loginFail = true;
      this.isLoading = false;
    }

    return result;
  }
}
