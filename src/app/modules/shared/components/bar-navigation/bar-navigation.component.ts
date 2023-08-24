import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/modules/users/interface/user.interface';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-bar-navigation',
  templateUrl: './bar-navigation.component.html',
  styleUrls: ['./bar-navigation.component.scss'],
})
export class BarNavigationComponent implements OnInit {
  @Input() user!: User;
  @Input() isHome: boolean = false;

  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  routeTo(route: string) {
    this.router.navigate([route]);
  }

  routeToProfile() {
    let id = this.authService.getUserId();
    this.router.navigate(['profile', id]);
  }

  logout() {
    this.tokenService.clearTokens();
    this.authService.clearUserId();
    this.authService.clearEmail();
    window.location.reload();
  }
}
