import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarNavigationComponent } from './components/bar-navigation/bar-navigation.component';
import { MaterialModule } from '../app-material.module';

@NgModule({
  declarations: [BarNavigationComponent],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
