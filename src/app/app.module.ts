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
import { CardsAreaHomeComponent } from './pages/home/components/cards-area-home/cards-area-home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExercisesListComponent } from './pages/exercises-list/exercises-list.component';
import { CardsAreaExerciseComponent } from './pages/components/cards-area-exercise/cards-area-exercise.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ExerciseItemComponent } from './pages/components/exercise-item/exercise-item.component';
import { PlansComponent } from './pages/plans/plans.component';
import { CardAreaPlansComponent } from './pages/plans/components/card-area-plans/card-area-plans.component';
import { PlanItemComponent } from './pages/plans/components/plan-item/plan-item.component';
import { ExpiresComponent } from './pages/expires/expires.component';
import { NgSelectModule } from '@ng-select/ng-select';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewUserComponent,
    CardsAreaHomeComponent,
    ProfileComponent,
    ExercisesListComponent,
    CardsAreaExerciseComponent,
    ExerciseItemComponent,
    PlansComponent,
    CardAreaPlansComponent,
    PlanItemComponent,
    ExpiresComponent,
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
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
  ],
  providers: [
    CookieService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
