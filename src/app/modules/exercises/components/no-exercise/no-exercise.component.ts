import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-exercise',
  templateUrl: './no-exercise.component.html',
  styleUrls: ['./no-exercise.component.scss'],
})
export class NoExerciseComponent implements OnInit {
  @Input() isSearch: boolean = false;

  constructor() {}

  ngOnInit() {}
}
