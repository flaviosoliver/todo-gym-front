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
  count: number = 0;
  isLoading: boolean = false;
  now: Date = new Date();
  constructor(
    private readonly plansService: PlansService,
    private snackBar: SnackBarCustomService
  ) {}

  async ngOnInit() {
    await this.findPlans();
    await this.getPlans();
    console.log(this.count);
  }

  async getPlans() {
    try {
      this.isLoading = true;
      const result = await this.plansService.getAllPlansByUser().toPromise();

      if (result && result.length > 0) {
        this.count = result.length;
        console.log('Plans', result);
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

  async findPlans(): Promise<Plan[]> {
    try {
      this.isLoading = true;
      const params = {
        name: '',
        focusMuscle: [],
        expiresIn: new Date(),
      };
      const result = await this.plansService.getByParams(params).toPromise();
      this.isLoading = false;
      if (result && result.length > 0) {
        this.plans = result;
      } else {
        this.plans = [];
      }
    } catch (error) {
      console.error(error);
      this.plans = [];
      this.snackBar.open(
        'Recarregue a página e tente novamente',
        SnackBarTypeEnum.ERROR,
        'snack-error'
      );
    } finally {
      this.isLoading = false;
      return this.plans;
    }
  }
}
