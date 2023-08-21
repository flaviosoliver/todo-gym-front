import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-btn-return',
  templateUrl: './btn-return.component.html',
  styleUrls: ['./btn-return.component.scss'],
})
export class BtnReturnComponent implements OnInit {
  constructor(private _location: Location) {}

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }
}
