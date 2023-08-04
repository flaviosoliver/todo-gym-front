import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { MaterialModule } from '../app-material.module';

@NgModule({
  declarations: [PlansComponent],
  imports: [CommonModule, MaterialModule],
})
export class PlansModule {}
