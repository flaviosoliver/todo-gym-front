import { Component, Input, OnInit } from '@angular/core';
import { Training } from 'src/app/modules/shared/interface/training.interface';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
})
export class PlanCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() focusMuscle: string[] = [];
  @Input() expiresIn: Date = new Date();
  @Input() training: Training[] = [];

  isLoading = false;

  constructor() {}

  ngOnInit() {}

  formatExpirationDate(): string {
    const expirationDate = new Date(this.expiresIn);
    if (!isNaN(expirationDate.getTime())) {
      const day = expirationDate.getDate().toString().padStart(2, '0');
      const month = (expirationDate.getMonth() + 1).toString().padStart(2, '0');
      const year = expirationDate.getFullYear().toString();
      return `${day}/${month}/${year}`;
    }
    return 'Indeterminado';
  }
}
