import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/modules/plans/interface/plan.interface';
import { PlansService } from 'src/app/modules/plans/plans.service';
import { ParamsDto } from 'src/app/modules/shared/dto/params.dto';
import { FocusEnum } from 'src/app/modules/shared/enums/focus.enum';
import { SnackBarTypeEnum } from 'src/app/modules/shared/enums/snack-bar-type.enum';
import { SnackBarCustomService } from 'src/app/modules/shared/service/snack-bar-custom.service';

@Component({
  selector: 'app-card-area-plans',
  templateUrl: './card-area-plans.component.html',
  styleUrls: ['./card-area-plans.component.scss'],
})
export class CardAreaPlansComponent implements OnInit {
  isLoading = false;
  plans: Plan[] = [];
  fullPlans: Plan[] = [];
  params: ParamsDto = {};
  isSearch = false;
  count: number = 0;
  haveExpires: boolean = false;
  now: Date = new Date();
  focusMuscleList: any[] = [
    { id: 1, text: FocusEnum.ABS },
    { id: 2, text: FocusEnum.AEROBIC },
    { id: 3, text: FocusEnum.FOREARM },
    { id: 4, text: FocusEnum.BICEPS },
    { id: 5, text: FocusEnum.BACK },
    { id: 6, text: FocusEnum.BUTTOCKS },
    { id: 7, text: FocusEnum.SHOULDERS },
    { id: 8, text: FocusEnum.CALVES },
    { id: 9, text: FocusEnum.CHEST },
    { id: 10, text: FocusEnum.LEGS },
    { id: 11, text: FocusEnum.TRICEPS },
  ];

  constructor(
    private plansService: PlansService,
    private snackBar: SnackBarCustomService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    await this.reloadList();
    await this.getAllPlans();
    console.log('plans', this.plans);
    console.log('fullPlans', this.fullPlans);
  }

  async handleSearch(term: string) {
    this.params.name = term;
    if (term && term.length >= 3) {
      this.filter(term);
    } else {
      this.params.name = '';
      this.filter('');
    }
  }

  async getAllPlans() {
    try {
      this.isLoading = true;
      const result = await this.plansService.getAllPlansByUser().toPromise();

      if (result && result.length > 0) {
        this.fullPlans = result;
        this.haveExpires = result.some((plan) => {
          if (plan.expiresIn) {
            const dateExpire = new Date(plan.expiresIn);
            if (dateExpire < this.now) {
              this.count += 1;
              return true;
            }
          }
          return false;
        });
      } else {
        this.fullPlans = [];
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

  async handleSelect(selectedOptions: string[]) {
    this.params.focusMuscle = selectedOptions;
    this.filter(undefined, selectedOptions);
  }

  handleExpired(event: any) {}

  async filter(name?: string, focusMuscle?: string[]) {
    this.isSearch = true;
    const params = new ParamsDto({
      name: name ?? this.params.name,
      expiresIn: new Date() ?? this.params.expiresIn,
      focusMuscle: focusMuscle ?? this.params.focusMuscle,
    });

    this.isLoading = true;
    await this.findPlans(params);
  }

  async findPlans(params: ParamsDto): Promise<Plan[]> {
    console.log('params', this.params);
    const result = await this.plansService.getByParams(params).toPromise();
    this.isLoading = false;
    return (this.plans = result && result.length > 0 ? result : []);
  }

  async reloadList() {
    const params = {
      name: '',
      focusMuscle: [],
      expiresIn: new Date(),
    };
    await this.findPlans(params);
  }

  compareDates(expiresIn: Date, now: Date): number {
    const expiresInTime = expiresIn.getTime();
    const nowTime = now.getTime();

    return expiresInTime - nowTime;
  }

  routeTo(route: string) {
    this.router.navigate([route]);
  }

  routeToProfile(id: string) {
    this.router.navigate(['profile', id]);
  }
}
