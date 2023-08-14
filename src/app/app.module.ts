import { ExercisesModule } from './modules/exercises/exercises.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/app-material.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { HomeComponent } from './pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NewUserComponent } from './pages/new-user/new-user.component';

import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TokenInterceptor } from './modules/shared/interceptor/token.interceptor';
import { PlansModule } from './modules/plans/plans.module';
import { CardsAreaComponent } from './pages/home/components/cards-area/cards-area.component';
import { PlanCardComponent } from './components/plan-card/plan-card.component';
import { NoPlanComponent } from './components/no-plan/no-plan.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SelectAvatarComponent } from './components/select-avatar/select-avatar.component';
import { ResponseInterceptor } from './modules/shared/interceptor/response.interceptor';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewUserComponent,
    CardsAreaComponent,
    PlanCardComponent,
    NoPlanComponent,
    ProfileComponent,
    SelectAvatarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    PlansModule,
    ExercisesModule,
  ],
  providers: [
    CookieService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
