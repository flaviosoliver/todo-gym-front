import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { NewUserComponent } from '../pages/new-user/new-user.component';
import { LoggedGuard } from './auth/guard/logged.guard';
import { ProfileComponent } from '../pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'new-user', component: NewUserComponent },
    ],
    canActivate: [LoggedGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
