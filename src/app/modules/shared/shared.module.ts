import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarNavigationComponent } from './components/bar-navigation/bar-navigation.component';
import { MaterialModule } from '../app-material.module';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { SelectAvatarComponent } from './components/select-avatar/select-avatar.component';
import { BtnReturnComponent } from './components/btn-return/btn-return.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectMultiComponent } from './components/select-multi/select-multi.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BtnAddComponent } from './components/btn-add/btn-add.component';

@NgModule({
  declarations: [
    BarNavigationComponent,
    SnackBarComponent,
    SelectAvatarComponent,
    BtnReturnComponent,
    SearchComponent,
    SelectMultiComponent,
    BtnAddComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
  ],
  exports: [
    BarNavigationComponent,
    SnackBarComponent,
    SelectAvatarComponent,
    BtnReturnComponent,
    SearchComponent,
    SelectMultiComponent,
    BtnAddComponent,
  ],
})
export class SharedModule {}
