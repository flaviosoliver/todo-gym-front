import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/modules/shared/interface/training.interface';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
})
export class PlanCardComponent implements OnInit {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() focusMuscle: string[] = [];
  @Input() expiresIn: Date = new Date();
  @Input() training: Training[] = [];
  @Input() disableExpiration: boolean = false;
  @Input() isHomePage: boolean = false;

  expired: boolean = false;
  isLoading = false;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    console.log('id', this.id);
    if (this.expiresIn instanceof Date) {
      this.expired = this.compareDates(this.expiresIn, new Date()) >= 0;
    } else if (!this.expiresIn) {
      this.expired = true;
    }
    console.log('training', this.training);
  }

  routeTo(id: string) {
    console.log('routeTo', id);
    this.router.navigate(['plans/form/', id]);
  }

  compareDates(expiresIn: Date, now: Date): number {
    const expiresInTime = expiresIn.getTime();
    const nowTime = now.getTime();

    return expiresInTime - nowTime;
  }

  formatExpirationDate(): string {
    if (this.expiresIn) {
      const expirationDate = new Date(this.expiresIn);
      if (!isNaN(expirationDate.getTime())) {
        const day = expirationDate.getDate().toString().padStart(2, '0');
        const month = (expirationDate.getMonth() + 1)
          .toString()
          .padStart(2, '0');
        const year = expirationDate.getFullYear().toString();
        return `${day}/${month}/${year}`;
      }
    }
    return 'Indeterminado';
  }
}
