import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-plan',
  templateUrl: './no-plan.component.html',
  styleUrls: ['./no-plan.component.scss'],
})
export class NoPlanComponent implements OnInit {
  @Input() isSearch: boolean = false;
  @Input() count: number = 0;
  @Output() reloadCards = new EventEmitter<boolean>();

  constructor(private readonly router: Router) {}

  ngOnInit() {}

  routeTo(route: string) {
    this.router.navigate([route]);
  }
}
