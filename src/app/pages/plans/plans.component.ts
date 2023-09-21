import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {}

  routeTo(route: string) {
    this.router.navigate([route]);
  }
}
