import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
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
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.getUser(this.userId);
  }

  get userId(): string {
    return this.authService.getUserId();
  }

  async getUser(id: string) {
    const user = await this.usersService.getUser(id).toPromise();
    if (user) {
      this.user = user;
    }
  }
}
