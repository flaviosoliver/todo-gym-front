import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  hide: boolean = true;
  email: string = '';
  password: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  onLogin() {
    // try {
    //   this.isLoading = true;
    //   const response = await this.authService.login(this.email, this.password);
    //   console.log(response);
    //   this.router.navigate(['']);
    //   this.isLoading = false;
    // } catch (error) {
    //   console.log(error);
    // }
    this.isLoading = true;
    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(['']);
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
