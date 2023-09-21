import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { NewUserComponent } from '../pages/new-user/new-user.component';
import { LoggedGuard } from './auth/guard/logged.guard';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ExercisesListComponent } from '../pages/exercises-list/exercises-list.component';
import { PlansComponent } from '../pages/plans/plans.component';
import { PlanItemComponent } from '../pages/plans/components/plan-item/plan-item.component';
import { ExpiresComponent } from '../pages/expires/expires.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: 'To-Do Gym | Home',
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    title: 'To-Do Gym | Meu Perfil',
  },
  {
    path: 'exercises',
    component: ExercisesListComponent,
    canActivate: [AuthGuard],
    title: 'To-Do Gym | Exercícios',
  },
  {
    path: 'plans',
    component: PlansComponent,
    canActivate: [AuthGuard],
    title: 'To-Do Gym | Meus Planos de Treino',
  },
  {
    path: 'plans/expires',
    component: ExpiresComponent,
    canActivate: [AuthGuard],
    title: 'To-Do Gym | Planos de Treino Expirados',
  },
  {
    path: 'plans/form/:id',
    component: PlanItemComponent,
    canActivate: [AuthGuard],
    title: 'To-Do Gym | Editar Plano de Treino',
  },
  {
    path: 'plans/form',
    component: PlanItemComponent,
    canActivate: [AuthGuard],
    title: 'To-Do Gym | Criar Novo Plano de Treino',
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
        title: 'To-Do Gym',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'To-Do Gym | Entrar',
      },
      {
        path: 'new-user',
        component: NewUserComponent,
        title: 'To-Do Gym | Criando Novo Usuário',
      },
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
