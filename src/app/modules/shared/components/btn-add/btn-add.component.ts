import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-add',
  templateUrl: './btn-add.component.html',
  styleUrls: ['./btn-add.component.scss'],
})
export class BtnAddComponent implements OnInit {
  @Input() element: any;
  @Input() label: string = '';

  constructor() {}

  ngOnInit() {
    this.label !== '' ? this.label : 'Adicionar novo';
  }
}
