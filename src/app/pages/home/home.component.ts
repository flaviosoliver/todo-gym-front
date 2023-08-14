import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { TokenService } from 'src/app/modules/shared/token.service';
import { User } from 'src/app/modules/users/interface/user.interface';
import { UsersService } from 'src/app/modules/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User | undefined;

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.getUser(this.userId);
  }

  get userId(): string {
    return this.authService.getUserId();
  }

  async getUser(id: string) {
    const user = await this.usersService.getUser(id);
    if (user) {
      this.user = user;
    }
  }

  routeTo(route: string) {
    this.router.navigate([route]);
  }

  routeToProfile(userId: string) {
    this.router.navigate(['profile', userId]);
  }

  logout() {
    this.tokenService.clearTokens();
    this.authService.clearUserId();
    this.authService.clearEmail();
    window.location.reload();
  }
}
