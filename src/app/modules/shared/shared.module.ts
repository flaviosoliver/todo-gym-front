import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarNavigationComponent } from './components/bar-navigation/bar-navigation.component';
import { MaterialModule } from '../app-material.module';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { SelectAvatarComponent } from './components/select-avatar/select-avatar.component';
import { BtnReturnComponent } from './components/btn-return/btn-return.component';

@NgModule({
  declarations: [
    BarNavigationComponent,
    SnackBarComponent,
    SelectAvatarComponent,
    BtnReturnComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    BarNavigationComponent,
    SnackBarComponent,
    SelectAvatarComponent,
    BtnReturnComponent,
  ],
})
export class SharedModule {}
