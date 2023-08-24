import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plan } from 'src/app/modules/plans/interface/plan.interface';
import { PlansService } from 'src/app/modules/plans/plans.service';
import { SnackBarComponent } from 'src/app/modules/shared/components/snack-bar/snack-bar.component';
import { SnackBarTypeEnum } from 'src/app/modules/shared/enums/snack-bar-type.enum';
import { SnackBarCustomService } from 'src/app/modules/shared/service/snack-bar-custom.service';

@Component({
  selector: 'app-cards-area-home',
  templateUrl: './cards-area-home.component.html',
  styleUrls: ['./cards-area-home.component.scss'],
})
export class CardsAreaHomeComponent implements OnInit {
  plans: Plan[] = [];
  isLoading: boolean = false;
  constructor(
    private readonly plansService: PlansService,
    private snackBar: SnackBarCustomService
  ) {}

  ngOnInit() {
    this.getPlans();
  }

  async getPlans() {
    try {
      this.isLoading = true;
      const result = await this.plansService.getAllPlansByUser().toPromise();

      if (result && result.length > 0) {
        this.plans = result;
      }
    } catch (error) {
      console.error(error);
      this.snackBar.open(
        'Recarregue a página e tente novamente',
        SnackBarTypeEnum.ERROR,
        'snack-error'
      );
    } finally {
      this.isLoading = false;
    }
  }
}
