import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/modules/plans/interface/plan.interface';
import { PlansService } from 'src/app/modules/plans/plans.service';

@Component({
  selector: 'app-cards-area',
  templateUrl: './cards-area.component.html',
  styleUrls: ['./cards-area.component.scss'],
})
export class CardsAreaComponent implements OnInit {
  plans: Plan[] = [];
  isLoading: boolean = false;
  constructor(private readonly plansService: PlansService) {}

  ngOnInit() {
    this.getPlans();
  }

  async getPlans() {
    this.isLoading = true;
    const result = await this.plansService.getAllPlansByUser().toPromise();

    if (result && result.length > 0) {
      this.isLoading = false;
      this.plans = result;
    }
    this.isLoading = false;
  }
}
