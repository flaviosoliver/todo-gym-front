import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app-material.module';
import { NoPlanComponent } from './components/no-plan/no-plan.component';
import { PlanCardComponent } from './components/plan-card/plan-card.component';

@NgModule({
  declarations: [PlanCardComponent, NoPlanComponent],
  imports: [CommonModule, MaterialModule],
  exports: [PlanCardComponent, NoPlanComponent],
})
export class PlansModule {}
